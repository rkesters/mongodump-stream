import * as q from 'q';
import * as fs from 'fs';
import {Stream} from "stream";
import {PathLike} from "fs";


export function streamToFile(stream: Stream, filePath: PathLike) {
  const d = q.defer();

  const outStream = fs.createWriteStream(filePath);
  stream.pipe(outStream);

  outStream.on('finish', function() {
    // TODO handle error case
    d.resolve();
  });

  return d.promise;
}


