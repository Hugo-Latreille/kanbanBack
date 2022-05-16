const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class CardHasTag extends Model {}

CardHasTag.init(
	{
		card_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		tag_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "card_has_tag",
	}
);

module.exports = CardHasTag;
