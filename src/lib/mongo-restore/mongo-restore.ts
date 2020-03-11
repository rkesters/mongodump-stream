import { Readable } from "stream";
import { MongoClient } from "mongodb";
import * as readline from "readline";
import * as q from "q";

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
  readline
    .createInterface({ input: stream })
    .on("line", line => {
      const p = col.insertOne(JSON.parse(line));
        linePromises.push(p);
    })
    .on("close", () => Promise.all(linePromises).then(()=> d.resolve()));

  const d = q.defer();

  return d.promise;
}
