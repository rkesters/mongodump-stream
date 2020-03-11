import { MongoClient } from "mongodb";
import { mongoRestore } from "../../../src/lib/mongo-restore/mongo-restore";
import * as fs from "fs";
import * as readline from "readline";
import * as path from "path";

describe("mongo-restore", () => {
  const dbUri: string = (<any>global).MONGO_URI;
  const client = new MongoClient(dbUri, {
    useUnifiedTopology: true
  });

  beforeEach(async () => {
    return client.connect();
  });

  afterEach(async () => {
    return client.close();
  });

  test("restore data from file", async done => {
    const db = client.db();
    await db.createCollection("mementos");

    const dataPath = path.resolve(
      process.cwd(),
      "__tests__/data/restoreData/mementos.json"
    );
    const readable = fs.createReadStream(dataPath);

    await mongoRestore(dbUri, "mementos", readable);
    const col = db.collection("mementos");

    const count = await col.countDocuments();
    const expectedStream = fs.createReadStream(dataPath);
    const lines = [];
    const reader = readline.createInterface(expectedStream).on("line", line => {
      lines.push(line);
    }).on("close", () => {
      expect(count).toEqual(lines.length);
      done();
    });

  }, 30000);
});
