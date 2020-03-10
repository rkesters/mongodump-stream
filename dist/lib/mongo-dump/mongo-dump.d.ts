/// <reference types="node" />
import { Stream } from "stream";
export declare function textDumpStream(mongoUri: string, collection: string): Promise<Stream>;
export declare function binaryDumpStream(mongoUri: string, collection: string): Promise<Stream>;
