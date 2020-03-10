import { Readable } from "stream";
import * as aws from "aws-sdk";


export async function streamToS3(
  name: string,
  Bucket: string,
  stream: Readable,
  awsConf: aws.S3.Types.ClientConfiguration
) {
  const client = new aws.S3(awsConf);

  return client.upload({ Key: name, Body: stream, Bucket }).promise();
}
