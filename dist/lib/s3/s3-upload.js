"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws = require("aws-sdk");
async function streamToS3(name, Bucket, stream, awsConf) {
    const client = new aws.S3(awsConf);
    return client.upload({ Key: name, Body: stream, Bucket }).promise();
}
exports.streamToS3 = streamToS3;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiczMtdXBsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9zMy9zMy11cGxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwrQkFBK0I7QUFHeEIsS0FBSyxVQUFVLFVBQVUsQ0FDOUIsSUFBWSxFQUNaLE1BQWMsRUFDZCxNQUFnQixFQUNoQixPQUF5QztJQUV6QyxNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFbkMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDdEUsQ0FBQztBQVRELGdDQVNDIn0=