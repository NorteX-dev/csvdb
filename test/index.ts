import { CsvDB, Model, DataType } from "../src";

const schema = {
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
};

class User extends Model {}

(async () => {
	const conn = new CsvDB({
		directory: "test/data",
	});

	User.init({
		instance: conn,
		schema: schema,
		modelName: "users",
	});

	const user = await User.findOne({ id: "1" });
	if (!user) return console.warn("no user found mf");

	// console.log("CLASS", User);
	user.set("username", "testusername123");
	console.log("INSTANCE", user);
	// await user.save();
})();
