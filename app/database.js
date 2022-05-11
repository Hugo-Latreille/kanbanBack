require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.PG_URL, {
	define: {
		updatedAt: "updated_at",
		createdAt: "created_at",
	},
	// logging: false,
});

const test = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

test();

module.exports = sequelize;
