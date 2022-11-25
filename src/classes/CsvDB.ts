interface IOptions {
	directory: string;
}

export default class CsvDB {
	directory: string;

	constructor(options: IOptions) {
		if (!options) {
			throw new Error("CsvDB(): Options are required");
		}
		if (!options.directory) {
			throw new Error("CsvDB(): Options.directory is required");
		}
		this.directory = options.directory;
	}
}
