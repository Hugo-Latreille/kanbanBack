require("dotenv").config();
const { Carte, Liste, Label } = require("./models");
// (async () => {
// 	const cartes = await Carte.findAll();

// 	console.log(cartes);
// })();

// (async () => {
// 	const listes = await Liste.findAll();

// 	console.log(listes);
// })();

// (async () => {
// 	const labels = await Label.findByPk(1);

// 	console.log(labels);
// })();

(async () => {
	const labelsByCard = await Carte.findByPk(1, {
		include: ["labels"],
	});

	console.log(labelsByCard);
})();
