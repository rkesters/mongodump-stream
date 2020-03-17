import * as path from "path";
import * as fs from "fs-extra";
import * as stackTrace from 'stack-trace';
import {mongoRestore} from "../mongo-restore/mongo-restore";
import {textDumpStream} from "../mongo-dump/mongo-dump";
import { streamToFile } from "../fs-dump/file";
import * as _ from 'lodash';

function parentPath() {
    const trace = stackTrace.get();
    const currentFrame = trace.shift();

    if (!currentFrame) {
        return;
    }

    const currentFile = currentFrame.getFileName();
    const parentFrame = trace.find(t => t.getFileName() !== currentFile && !t.getFileName().includes('node_modules'));

    if (!parentFrame) {
        return;
    }

    const parentFile = parentFrame.getFileName();

    return path.dirname(parentFile);
}

export async function saveFixture(name: string, collections: string[]) {
    const calledPath = parentPath() ?? process.cwd();
    const basePath = path.resolve(calledPath, '__mongo_fixtures__', name);

    if (fs.existsSync(basePath)) {
        const files = fs.readdirSync(basePath);

        const fullFixtureExists = files.every(file => {
            const fname = path.basename(file, '.json');

            return collections.includes(fname);
        });

        if (fullFixtureExists) {
            return;
        }

        const partialFixtureExists = files.filter(file => {
            const fname = path.basename(file, '.json');

            return collections.includes(fname);
        });

        if (!_.isEmpty(partialFixtureExists)) {
            partialFixtureExists.forEach(file => fs.unlinkSync(path.resolve(basePath, file)));
        }
    }

    return dumpCollections(basePath, collections);
}

export async function restoreFixture(name: string) {
    const calledPath = parentPath() ?? process.cwd();
    const basePath = path.resolve(calledPath, '__mongo_fixtures__', name);

    return loadCollections(basePath);
}


export async function loadCollections(basePath: string) {
    if (!fs.existsSync(basePath)) {
        throw new Error(`unknown path ${basePath}`);
    }
    const files = fs.readdirSync(basePath);

    const filePromises =  files.map(  async (file: string) => {
        if (process.env.EXPLOIT_DB_URI) {
            const collectionName = path.basename(file, '.json');
            const stream = fs.createReadStream(path.resolve(basePath, file));

            return  mongoRestore(`mongodb://${process.env.EXPLOIT_DB_URI}`, collectionName, stream);

        }
    });

    return Promise.all(filePromises);
}

export async function dumpCollections(basePath: string, collections: string[]) {
    if (!fs.existsSync(basePath)) {
        fs.mkdirpSync(basePath);
    }

    const collectionPromises =  collections.map( async (collection: string) => {
        if (process.env.EXPLOIT_DB_URI) {
            const { stream } = await textDumpStream(`mongodb://${process.env.EXPLOIT_DB_URI}`, collection);

            return streamToFile(stream, path.resolve(basePath, `${collection}.json`));
        }
    });

    return Promise.all(collectionPromises);
}
