const { Carte } = require("../models/");

const carteController = {
	getAllCartes: async (req, res) => {
		try {
			// const listes = await Liste.findAll();
			const carteAvecListeEtLabels = await Carte.findAll({
				include: ["labels", "liste"],
			});
			res.json(carteAvecListeEtLabels);
		} catch (error) {
			console.error(error);
		}
	},
	getOneCarte: async (req, res) => {
		try {
			const id = Number(req.params.id);
			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}
			const oneCarte = await Carte.findByPk(id);
			res.json(oneCarte);
		} catch (error) {
			console.error(error);
		}
	},
	createCarte: async (req, res) => {
		try {
			const formData = req.body;
			console.log(formData);
			// const liste = {
			// 	nom: "Brigitte",
			// 	position: 3,
			// };
			await Carte.create(formData);

			res.send("Nouvelle carte créée");
		} catch (error) {
			console.error(error);
		}
	},
	updateCarte: async (req, res) => {
		try {
			const id = Number(req.params.id);
			const body = req.body;
			console.log(id, req.body);

			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}

			const updateCarte = await Carte.update(body, {
				where: { id },
			});
			res.json(updateCarte);
		} catch (error) {
			console.error(error);
		}
	},
	deleteCarte: async (req, res) => {
		try {
			const id = Number(req.params.id);

			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}

			const carteToDelete = await Carte.findByPk(id);
			carteToDelete.destroy();
			res.send("Carte supprimée");
		} catch (error) {
			console.error(error);
		}
	},
};

module.exports = carteController;
