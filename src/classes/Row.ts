import CsvDB from "./CsvDB";

export default class Row {
	private db: CsvDB;

	constructor(db: CsvDB) {
		this.db = db;
	}
}
