interface IOptions {
	directory: string;
}

export default class CsvDB {
	directory: string;

	constructor(options: IOptions) {
		if (!options) {
			throw new Error("CsvDB(): options are required");
		}
		if (!options.directory) {
			throw new Error("CsvDB(): options.directory is required");
		}
		this.directory = options.directory;
	}
}
