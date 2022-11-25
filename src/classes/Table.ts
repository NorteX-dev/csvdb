import CsvDB from "./CsvDB";

export default class Table {
	private db: CsvDB;

	constructor(db: CsvDB) {
		this.db = db;
	}
}
