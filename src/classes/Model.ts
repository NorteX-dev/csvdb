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

export interface IField {
	[key: string]: IColumn;
}

export class Model {
	conn: CsvDB;
	name: string;
	fields: any;

	constructor(conn: CsvDB, name: string) {
		this.conn = conn;
		this.name = name;
	}

	private checkFields(fields): Error | null {
		if (!fields) {
			return new Error("fields are required");
		}
		if (typeof fields !== "object") {
			return new Error("fields must be an object");
		}
		if (Object.keys(fields).length === 0) {
			return new Error("fields must have at least one field");
		}
		return null;
	}

	private isDatabaseReady(): boolean {
		return true;
	}

	schema(fields: IField = {}) {
		const err = this.checkFields(fields);
		if (err) {
			throw new Error("Database.define(): fields are invalid:\n" + err.message);
		}
		this.fields = fields;
		return this.fields;
	}
}
