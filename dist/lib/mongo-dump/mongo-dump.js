"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
async function getDumpProcess(uri, collection) {
    const client = new mongodb_1.MongoClient(uri);
    await client.connect();
    const db = client.db(), col = db.collection(collection);
    return col.find({}).stream();
}
async function textDumpStream(mongoUri, collection) {
    return getDumpProcess(mongoUri, collection);
}
exports.textDumpStream = textDumpStream;
async function binaryDumpStream(mongoUri, collection) {
    return getDumpProcess(mongoUri, collection);
}
exports.binaryDumpStream = binaryDumpStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ28tZHVtcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbW9uZ28tZHVtcC9tb25nby1kdW1wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EscUNBQXNDO0FBRXRDLEtBQUssVUFBVSxjQUFjLENBQzNCLEdBQVcsRUFDWCxVQUFrQjtJQUVsQixNQUFNLE1BQU0sR0FBRyxJQUFJLHFCQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFcEMsTUFBTSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFFdkIsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUNwQixHQUFHLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVsQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDL0IsQ0FBQztBQUVNLEtBQUssVUFBVSxjQUFjLENBQ2xDLFFBQWdCLEVBQ2hCLFVBQWtCO0lBRWxCLE9BQU8sY0FBYyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBTEQsd0NBS0M7QUFFTSxLQUFLLFVBQVUsZ0JBQWdCLENBQ3BDLFFBQWdCLEVBQ2hCLFVBQWtCO0lBRWxCLE9BQU8sY0FBYyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBTEQsNENBS0MifQ==