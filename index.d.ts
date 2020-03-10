declare module '@rkesters/mongodump-stream' {
  import { ChildProcess } from 'child_process';

  interface IAWSConfig {
    key: string;
    secret: string;
    bucket: string;
  }
  type Handler = (stream: ChildProcess, collection: string) => Promise<any>;
  interface MongoDumpStream {
    slurp: {
      binary: (mongoUri: string, collection: string) => ChildProcess;
      text: (mongoUri: string, collection: string) => ChildProcess;
      multiBinary: (mongoUri: string, collections: string[], handler: Handler) => Promise<any>;
    };

    dump: {
      s3: (fileName: string, stream: ChildProcess, awsConf: IAWSConfig) => Promise<any>;
      fs: {
        file: (fileName: string, stream: ChildProcess) => Promise<any>;
      };
    };
  }

  const lib: MongoDumpStream;

  export = lib;
}

