import * as mongoDump from "./lib/mongo-dump/mongo-dump";
import { streamToS3 } from "./lib/s3/s3-upload";
import { streamToFile } from "./lib/fs-dump/file";
export declare const slurp: {
    binary: typeof mongoDump.binaryDumpStream;
    text: typeof mongoDump.textDumpStream;
};
export declare const dump: {
    s3: typeof streamToS3;
    fs: {
        file: typeof streamToFile;
    };
};
