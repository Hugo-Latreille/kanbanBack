const { Model, DataTypes } = require("sequelize");
const sequelize = require("./../database");

class Label extends Model {}

Label.init(
	{
		id: {
			type: DataTypes.INTEGER,
			unique: true,
			autoIncrement: true,
			primaryKey: true,
		},
		nom: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		couleur: {
			type: DataTypes.STRING(7),
			allowNull: false,
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		sequelize,
		tableName: "label",
	}
);

module.exports = Label;
