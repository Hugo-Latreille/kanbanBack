const Carte = require("./carte");
const Liste = require("./liste");
const Label = require("./label");

//relation carte et liste
Carte.belongsTo(Liste, {
	foreignKey: "liste_id",
	as: "liste",
});

Liste.hasMany(Carte, {
	foreignKey: "liste_id",
	as: "cartes",
});

//relation carte et label

Carte.belongsToMany(Label, {
	as: "labels",
	through: "carte_has_label",
	foreignKey: "carte_id",
	otherKey: "label_id",
});

Label.belongsToMany(Carte, {
	as: "cartesList",
	through: "carte_has_label",
	foreignKey: "label_id",
	otherKey: "carte_id",
});

module.exports = { Carte, Liste, Label };
