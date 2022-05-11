const { Model, DataTypes } = require("sequelize");
const sequelize = require("./../database");

class CarteHazLabel extends Model {}

CarteHazLabel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			unique: true,
			autoIncrement: true,
			primaryKey: true,
		},
		carte_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		label_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: literal("CURRENT_TIMESTAMP"),
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		sequelize,
		tableName: "carte_has_label",
	}
);

module.exports = CarteHazLabel;
