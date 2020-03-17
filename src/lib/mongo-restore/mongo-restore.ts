import { Readable } from "stream";
import { MongoClient, ObjectId } from "mongodb";
import * as readline from "readline";
import * as q from "q";
import * as _ from 'lodash'

export async function mongoRestore(
  uri: string,
  collection: string,
  stream: Readable
) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  await client.connect();

  const db = client.db(),
    col = db.collection(collection);

  await col.deleteMany({});

  const linePromises: Promise<any>[] = [];
  const d = q.defer();
  const lines: string[] = [];

  let nextLine: string = "";
  readline
    .createInterface({ input: stream })
    .on("line", line => {
      if (line.includes(`<eor>`)) {
        try {
          const parts = line.split(`<eor>`);
          lines.push(parts[0]);
          nextLine = parts[1];
          const json = JSON.parse(lines.join(""));
          json._id = new ObjectId(json._id);
          const p = col.insertOne(json);
          linePromises.push(p);
          lines.length = 0;
          !_.isEmpty(nextLine) && lines.push(nextLine);
          return;
        } catch (e) {
          console.error(e);
        }
      }
      lines.push(line);
    })
    .on("close", () => Promise.all(linePromises).then(async () => {
      await client.close()
      d.resolve()
    }));

  return d.promise;
}
