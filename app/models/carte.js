const { Model, DataTypes } = require("sequelize");
const sequelize = require("./../database");

class Carte extends Model {}

Carte.init(
	{
		id: {
			type: DataTypes.INTEGER,
			unique: true,
			autoIncrement: true,
			primaryKey: true,
		},
		contenu: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		position: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		couleur: {
			type: DataTypes.STRING(7),
			allowNull: true,
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
		tableName: "carte",
	}
);

module.exports = Carte;
