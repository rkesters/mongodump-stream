/// <reference types="node" />
import { Readable } from "stream";
import * as aws from "aws-sdk";
export declare function streamToS3(name: string, Bucket: string, stream: Readable, awsConf: aws.S3.Types.ClientConfiguration): Promise<aws.S3.ManagedUpload.SendData>;
