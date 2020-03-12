import { MongoClient } from "mongodb";
import * as fs from "fs-extra";
import * as q from "q";
import * as readline from "readline";
import * as path from "path";

import * as mongoDump from "../../../src/lib/mongo-dump/mongo-dump";
import { streamToFile as fsDumpFile } from "../../../src/lib/fs-dump/file";

describe("Mongo dump stream", function() {
  const mongoCollection = "dumptestcollection";
  const mongoUrl: string = (<any>global).MONGO_URI;
  const client = new MongoClient(mongoUrl, {
    useUnifiedTopology: true
  });

  beforeAll(async () => {
    await client.connect();
    await client.db().createCollection(mongoCollection);
    return client
      .db()
      .collection(mongoCollection)
      .insertOne({ a: "The cat is dead" });
  });

  afterAll(async () => {
    await client
      .db()
      .collection(mongoCollection)
      .deleteMany({});

    return client.close();
  });

  test("Should get a text dump stream", async () => {
    const { stream } = await mongoDump.textDumpStream(
      mongoUrl,
      mongoCollection
    );
    const name = "test.json";
    await fsDumpFile(stream, name);
    const buffer = fs.readFileSync(name);
    const data: { a: string; _id: string } = JSON.parse(buffer.toString());

    expect(data.a).toMatchInlineSnapshot(`"The cat is dead"`);
    expect(data._id).toBeDefined();

    fs.unlinkSync(name);
  });

  test("Should get a binary dump stream", async () => {
    const { stream } = await mongoDump.binaryDumpStream(
      mongoUrl,
      mongoCollection
    );
    const name = "test.bson";
    await fsDumpFile(stream, name);
    const buffer = fs.readFileSync(name);
    const data: { a: string; _id: string } = JSON.parse(buffer.toString());

    expect(data.a).toMatchInlineSnapshot(`"The cat is dead"`);
    expect(data._id).toBeDefined();
    fs.unlinkSync(name);
  });
});

/*
describe("Multiple collections", function() {
  before(function(done) {
    testUtils.getCollPromise(mongoUrl, "multi_a").then(function(coll) {
      coll.insert({ a: Date.now() }, function(err) {
        if (err) {
          done(err);
        }

        testUtils.getCollPromise(mongoUrl, "multi_b").then(function(coll) {
          coll.insert({ b: Date.now() }, function(err) {
            if (err) {
              done(err);
            }

            done(); // yay!!
          });
        });
      });
    });
  });

  it("Should create multiple files", function(done) {
    const i = 0;
    const names = [];
    mongoDump
      .multiBinary(mongoUrl, ["multi_a", "multi_b"], function(
        stream,
        collName
      ) {
        i++;
        const d = q.defer();
        const name = i + collName + "-binary.bson";
        names.push(name);
        d.resolve(name);
        return d.promise;
      })
      .then(function(data) {
        expect(data).to.contain(names[0]);
        expect(data).to.contain(names[1]);
        done();
      })
      .then(function() {}, console.log);
  });
});
*/
