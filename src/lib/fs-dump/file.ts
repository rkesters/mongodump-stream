import * as q from "q";
import * as fs from "fs";
import { PathLike } from "fs";
import * as readline from "readline";
import { Readable } from "stream";
import { once } from "events";

export function streamToFile(stream: Readable, filePath: PathLike) {
  const d = q.defer();

  const outStream = fs.createWriteStream(filePath);

  outStream.on("finish", function() {
    d.resolve();
  });

  let chunk: string[] = [];
  readline
    .createInterface({ input: stream })
    .on("line", async line => {
      chunk.push(JSON.parse(line));
    })
    .on("close", async () => {
      if (!outStream.write(`${JSON.stringify(chunk, null, 2)}`)) {
        await once(outStream, "drain");
      }
      outStream.close();
    });

  return d.promise;
}
