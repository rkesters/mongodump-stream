"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const q = require("q");
const fs = require("fs");
function streamToFile(stream, filePath) {
    const d = q.defer();
    const outStream = fs.createWriteStream(filePath);
    stream.pipe(outStream);
    outStream.on('finish', function () {
        // TODO handle error case
        d.resolve();
    });
    return d.promise;
}
exports.streamToFile = streamToFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZnMtZHVtcC9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUJBQXVCO0FBQ3ZCLHlCQUF5QjtBQUt6QixTQUFnQixZQUFZLENBQUMsTUFBYyxFQUFFLFFBQWtCO0lBQzdELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUVwQixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUV2QixTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUNyQix5QkFBeUI7UUFDekIsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQVpELG9DQVlDIn0=