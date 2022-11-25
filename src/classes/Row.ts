import CsvDB from "./CsvDB";

export class Row {
	private conn: CsvDB;

	constructor(conn: CsvDB) {
		this.conn = conn;
	}
}
