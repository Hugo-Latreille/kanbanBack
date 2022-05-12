const { Model, DataTypes } = require("sequelize");
const sequelize = require("./../database");

class CarteHasLabel extends Model {}

cardHasTag.init(
	{
		carte_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		label_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "card_has_tag",
	}
);

module.exports = cardHasTag;
