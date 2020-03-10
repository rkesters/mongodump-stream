import * as mongoDump from "./lib/mongo-dump/mongo-dump";
import { streamToS3 } from "./lib/s3/s3-upload";
import { streamToFile } from "./lib/fs-dump/file";

export const slurp = {
  binary: mongoDump.binaryDumpStream,
  text: mongoDump.textDumpStream
};

export const dump = {
  s3: streamToS3,
  fs: {
    file: streamToFile
  }
};
