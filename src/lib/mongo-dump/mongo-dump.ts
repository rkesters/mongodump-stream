import { MongoClient } from "mongodb";



async function getDumpProcess(uri: string, collection: string) {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  const connection = await client.connect();

  const db = client.db(),
    col = db.collection(collection);

  const stream = col.find({}).stream({
    transform: function(doc) {
      return `${JSON.stringify(doc)}<eor>\n`;
    }
  });

  return { connection, stream };
}

export async function textDumpStream(
  mongoUri: string,
  collection: string
) {
  return getDumpProcess(mongoUri, collection);
}

export async function binaryDumpStream(
  mongoUri: string,
  collection: string
) {
  return getDumpProcess(mongoUri, collection);
}
