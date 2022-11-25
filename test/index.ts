import { CsvDB, Model, DataType, Row } from "../src";

const connection = new CsvDB({
	directory: "test/data",
});

const model = new Model(connection, "test");
model.schema({
	id: {
		type: DataType.Number,
		required: true,
		default: () => 5,
		validate: (v) => true,
	},
	username: {
		type: DataType.String,
		required: true,
	},
	password: {
		type: DataType.String,
		required: true,
	},
});

console.log(model);
