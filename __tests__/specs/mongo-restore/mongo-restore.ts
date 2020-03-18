import { MongoClient } from "mongodb";
import { mongoRestore } from "../../../src/lib/mongo-restore/mongo-restore";
import * as fs from "fs";
import * as readline from "readline";
import * as path from "path";
import exp = require("constants");

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

  test("restore data from file", async () => {
    const db = client.db();
    await db.createCollection("mementos");

    const dataPath = path.resolve(
      process.cwd(),
      "__tests__/data/restoreData/mementos.json"
    );
    const readable = fs.createReadStream(dataPath);

    await mongoRestore(dbUri, "mementos", dataPath);
    const col = db.collection("mementos");

    const count = await col.countDocuments();
    expect(count).toMatchInlineSnapshot(`2`);
  }, 30000);
});
