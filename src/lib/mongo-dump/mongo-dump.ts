import * as q from "q";
import * as fs from "fs";
import { Stream } from "stream";
import { MongoClient } from "mongodb";

async function getDumpProcess(
  uri: string,
  collection: string
): Promise<Stream> {
  const client = new MongoClient(uri);

  await client.connect();

  const db = client.db(),
    col = db.collection(collection);

  return col.find({}).stream({
    transform: function(doc) {
      return `${JSON.stringify(doc)}\n`;
    }
  });
}

export async function textDumpStream(
  mongoUri: string,
  collection: string
): Promise<Stream> {
  return getDumpProcess(mongoUri, collection);
}

export async function binaryDumpStream(
  mongoUri: string,
  collection: string
): Promise<Stream> {
  return getDumpProcess(mongoUri, collection);
}
