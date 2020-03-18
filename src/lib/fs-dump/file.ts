import * as q from "q";
import * as fs from "fs";
import { PathLike } from "fs";
import { cosmiconfig, cosmiconfigSync } from "cosmiconfig";
import * as readline from "readline";
import { Readable } from "stream";
import { once } from "events";

export function streamToFile(stream: Readable, filePath: PathLike) {
  const d = q.defer(),
    explorerSync = cosmiconfigSync("mongoDumpStream"),
    searchedFor = explorerSync.search();

  const chunkSize: number = searchedFor?.config.chunkSize ?? 40;

  const outStream = fs.createWriteStream(filePath);

  outStream.on("finish", function() {
    d.resolve();
  });

  let lineCount = 0;
  let starting = true;
  let chunk: string[] = [];
  readline
    .createInterface({ input: stream })
    .on("line", async line => {
      if (chunk.length < chunkSize) {
        chunk.push(JSON.parse(line));
      } else {
        const out = `${starting ? "[\n" : ",\n"}${JSON.stringify(chunk)}`;
        if (!outStream.write(out)) {
          await once(outStream, "drain");
        }
        chunk.length = 0;
        starting = false;
      }
    })
    .on("close", async () => {
      if (
        !outStream.write(
          `${chunk.length ? `,${JSON.stringify(chunk)}` : ""} \n]`
        )
      ) {
        await once(outStream, "drain");
      }
      outStream.close();
    });

  return d.promise;
}
