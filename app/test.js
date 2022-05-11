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

// (async () => {
// 	const labelsByCard = await Carte.findByPk(1, {
// 		include: ["labels"],
// 	});

// 	console.log(labelsByCard);
// })();

(async () => {
	const ListeAvecCartes = await Liste.findAll({
		include: [{ association: "cartes", include: ["labels"] }],
	});

	let display = "";

	ListeAvecCartes.forEach((liste) => {
		display += "----------------------------------------\n";
		display += `Liste ${liste.position} - ${liste.nom}\n`;
		display += "----------------------------------------\n";
		liste.cartes.forEach((carte) => {
			display += `    Carte #${carte.position} - ${carte.contenu}\n`;
			carte.labels.forEach((label) => {
				display += `        label: ${label.nom}\n`;
			});
		});
	});
	console.log(display);
})();
