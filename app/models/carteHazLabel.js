const { Model, DataTypes } = require("sequelize");
const sequelize = require("./../database");

class CarteHasLabel extends Model {}

CarteHasLabel.init(
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
			defaultValue: DataTypes.NOW,
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

module.exports = CarteHasLabel;
