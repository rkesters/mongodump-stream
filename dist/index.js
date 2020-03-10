"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoDump = require("./lib/mongo-dump/mongo-dump");
const s3_upload_1 = require("./lib/s3/s3-upload");
const file_1 = require("./lib/fs-dump/file");
exports.slurp = {
    binary: mongoDump.binaryDumpStream,
    text: mongoDump.textDumpStream
};
exports.dump = {
    s3: s3_upload_1.streamToS3,
    fs: {
        file: file_1.streamToFile
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5REFBeUQ7QUFDekQsa0RBQWdEO0FBQ2hELDZDQUFrRDtBQUVyQyxRQUFBLEtBQUssR0FBRztJQUNuQixNQUFNLEVBQUUsU0FBUyxDQUFDLGdCQUFnQjtJQUNsQyxJQUFJLEVBQUUsU0FBUyxDQUFDLGNBQWM7Q0FDL0IsQ0FBQztBQUVXLFFBQUEsSUFBSSxHQUFHO0lBQ2xCLEVBQUUsRUFBRSxzQkFBVTtJQUNkLEVBQUUsRUFBRTtRQUNGLElBQUksRUFBRSxtQkFBWTtLQUNuQjtDQUNGLENBQUMifQ==