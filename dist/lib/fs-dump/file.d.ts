/// <reference types="node" />
import * as q from 'q';
import { Stream } from "stream";
import { PathLike } from "fs";
export declare function streamToFile(stream: Stream, filePath: PathLike): q.Promise<unknown>;
