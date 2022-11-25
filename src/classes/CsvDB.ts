import * as fs from "fs";
import { ISchema, IValues, Model } from "./Model";

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

	stringifyValues(values: IValues): string {
		const header = Object.keys(values).join(",");
		const mappedValues = values.map((value) => {
			const line = [];
			Object.keys(values).forEach((key) => {
				line.push(value[key]);
			});
			return line.join(",");
		});
		return `${header}\n${mappedValues.join("\n")}`;
	}

	parseModel(stringified: string): IValues {
		const lines = stringified.split("\n");
		const header = lines[0].split(",");
		return lines.slice(1, lines.length - 1).map((line) => {
			const values = line.split(",");
			const obj: any = {};
			header.forEach((key, i) => {
				obj[key] = values[i];
			});
			return obj;
		});
	}

	ensureDirectory() {
		if (!fs.existsSync(this.directory)) {
			fs.mkdirSync(this.directory);
		}
	}

	ensureFile(file: string) {
		if (!fs.existsSync(file)) {
			fs.writeFileSync(file, "");
		}
	}

	readContents(file: string): Promise<any> {
		return new Promise((resolve) => {
			fs.readFile(file, { encoding: "utf8" }, (err, values) => {
				if (err) throw err;
				return resolve(values);
			});
		});
	}

	async writeContents(file: string, values: IValues): Promise<any> {
		return new Promise((resolve) => {
			const stringified = this.stringifyValues(values);
			fs.writeFile(file, stringified, (err) => {
				if (err) throw err;
				return resolve(true);
			});
		});
	}
}
