import { MongoClient } from "mongodb";
import { mongoRestore } from "../../../src/lib/mongo-restore/mongo-restore";
import * as fs from "fs";
import * as q from "q";
import * as readline from "readline";
import * as path from "path";

import * as mongoDump from "../../../src/lib/mongo-dump/mongo-dump";
import { streamToFile as fsDumpFile } from "../../../src/lib/fs-dump/file";

const mongoUrl = "mongodb://localhost:27017/dumptestdb";
const mongoCollection = "dumptestcollection";

const removeFn;
const insertFn;
const findOneFn;


describe("Mongo dump stream", function() {
  const dbUri: string = (<any>global).MONGO_URI;
  const client = new MongoClient(dbUri, {
    useUnifiedTopology: true
  });

  beforeEach(async () => {
    await client.connect();
    await client.db().createCollection(mongoCollection);
    return client
      .db()
      .collection(mongoCollection)
      .insertOne({ a: "The cat is dead" });
  });

  afterEach(async () => {
    await client.close();
    return client
      .db()
      .collection(mongoCollection)
      .deleteMany({});
  });

  it("Should get a text dump stream", async function() {
    const valId;

    const {stream} = await mongoDump.textDumpStream(mongoUrl, mongoCollection);
    await fsDumpFile(stream,  "test.json");

    expect().
  });

  it("Should get a binary dump stream", function(done) {
    const valId;
    const now = Date.now();

    const args = [
      "--db",
      "dumptestdb",
      "--collection",
      "dumptestcollection",
      now + ".bson"
    ];

    collPromise.then(function() {
      removeFn({})
        .then(function() {
          return insertFn({ a: now });
        })
        .then(function(res) {
          valId = res[0]._id;

          const stream = mongoDump.getBinaryDumpStream(mongoUrl, mongoCollection);
          const outStream = fs.createWriteStream(now + ".bson");
          stream.pipe(outStream);

          outStream.on(
            "finish",
            loadIntoMongo("mongorestore", valId, now, args, done)
          );
        }, console.log);
    });
  });
});

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
