import CsvDB from "./CsvDB";

export enum DataType {
	Number = "number",
	String = "string",
	Boolean = "boolean",
}

export interface IColumn {
	type: DataType;
	required?: boolean;
	default?: () => any;
	validate?: (value: any) => boolean;
}

export interface ISchema {
	[key: string]: IColumn;
}

export interface IValues {
	[key: string]: any;
}

interface IInitOptions {
	instance: CsvDB;
	schema: ISchema;
	modelName: string;
}

export class Model {
	static conn: CsvDB;
	static modelName: string;
	static file: string;
	static schema: any;

	conn: CsvDB;
	modelName: string;
	file: string;
	schema: any;
	values: any[];

	static init(options: IInitOptions) {
		if (!options) throw new Error("Model.init(): options are required");
		if (!options.instance) throw new Error("Model.init(): options.instance is required");
		if (!options.schema) throw new Error("Model.init(): options.schema is required");
		if (!options.modelName) throw new Error("Model.init(): options.modelName is required");

		this.conn = options.instance;
		this.modelName = options.modelName;
		this.file = `${this.conn.directory}/${this.modelName}.csv`;
		this.schema = options.schema;
	}

	static ensureReady() {
		// Static ensure
		if (!this.conn) throw new Error("Can't perform operation on model before it's initialisation");
		if (!this.modelName) throw new Error("Can't perform operation on model before it's initialisation");
		if (!this.file) throw new Error("Can't perform operation on model before it's initialisation");
		this.conn.ensureDirectory();
		this.conn.ensureFile(this.file);
	}

	static async create() {
		this.ensureReady();
		const contents = await this.conn.readContents(this.file);
		const parsedContents = this.conn.parseModel(contents);
		// write new row to file
		return await this.conn.writeContents(this.file, this);
	}

	private static _match(parsedContents: IValues, query: { [key: string]: any }) {
		return parsedContents.find((row) => {
			let match = true;
			Object.keys(query).forEach((key) => {
				if (row[key] !== query[key]) match = false;
			});
			return match;
		});
	}

	static async findOne(query: { [key: string]: any }) {
		this.ensureReady();
		const contents = await this.conn.readContents(this.file);
		const parsedContents = this.conn.parseModel(contents);
		const result = Model._match(parsedContents, query);
		if (!result) return null;

		// Found row, create new instance of model and return it.
		const model = new Model();
		model.conn = this.conn;
		model.modelName = this.modelName;
		model.file = this.file;
		model.schema = this.schema;
		model.values = result;
		return model;
	}

	ensureReady() {
		// Fetched ensure
		if (!this.conn) throw new Error("Can't perform operation on model before it's initialisation");
		if (!this.modelName) throw new Error("Can't perform operation on model before it's initialisation");
		if (!this.file) throw new Error("Can't perform operation on model before it's initialisation");
		this.conn.ensureDirectory();
		this.conn.ensureFile(this.file);
	}

	async save() {
		this.ensureReady();
		if (!this.values || !this.values.length) this.values = [];
		return await this.conn.writeContents(this.file, this);
	}

	set(key: string, value: any) {
		if (!this.values || !this.values.length) this.values = [];
		this.values[key] = value;
	}

	get(key: string) {
		if (!this.values || !this.values.length) this.values = [];
		return this.values[key];
	}
}
