import { Readable } from "stream";
import { MongoClient, ObjectId } from "mongodb";
import * as readline from "readline";
import * as q from "q";
import * as _ from "lodash";
import * as fs from "fs-extra";

export async function mongoRestore(
  uri: string,
  collection: string,
  filename: string
) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  await client.connect();

  const db = client.db(),
    col = db.collection(collection);

  await col.deleteMany({});

  const d = q.defer();

  const file: any[] = fs.readJsonSync(filename);

  const data = file.map( (record: any) => {
    record._id = new ObjectId(record._id);

    return record;
  });

  col.insertMany(data).then(() => {
    d.resolve();
  });

  return d.promise;
}
