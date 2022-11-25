"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CsvDB {
    constructor(options) {
        if (!options) {
            throw new Error("CsvDB(): Options are required");
        }
        if (!options.directory) {
            throw new Error("CsvDB(): Options.directory is required");
        }
        this.directory = options.directory;
    }
}
exports.default = CsvDB;
