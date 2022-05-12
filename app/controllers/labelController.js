const { Label, Carte } = require("../models/");

const labelController = {
	getAllLabels: async (req, res) => {
		try {
			// const listes = await Liste.findAll();
			const labelAvecListeEtLabels = await Label.findAll({
				include: ["labels", "liste"],
			});
			res.json(labelAvecListeEtLabels);
		} catch (error) {
			console.error(error);
		}
	},
	getOneLabel: async (req, res) => {
		try {
			const id = Number(req.params.id);
			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}
			const oneLabel = await Label.findByPk(id);
			res.json(oneLabel);
		} catch (error) {
			console.error(error);
		}
	},
	createLabel: async (req, res) => {
		try {
			const formData = req.body;
			console.log(formData);
			// const liste = {
			// 	nom: "Brigitte",
			// 	position: 3,
			// };
			await Label.create(formData);

			res.send("Nouveau label créée");
		} catch (error) {
			console.error(error);
		}
	},
	updateLabel: async (req, res) => {
		try {
			const id = Number(req.params.id);
			const body = req.body;
			console.log(id, req.body);

			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}

			const updateLabel = await label.update(body, {
				where: { id },
			});
			res.json(updateLabel);
		} catch (error) {
			console.error(error);
		}
	},
	deleteLabel: async (req, res) => {
		try {
			const id = Number(req.params.id);

			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}

			const labelToDelete = await label.findByPk(id);
			labelToDelete.destroy();
			res.send("label supprimée");
		} catch (error) {
			console.error(error);
		}
	},
	addLabelToCarte: async (req, res) => {
		try {
			const labelId = Number(req.params.labelId);
			const carteId = Number(req.params.carteId);

			if (isNaN(labelId) || isNaN(carteId)) {
				throw new Error("Un problème avec l'id");
			}

			const label = await Label.findByPk(labelId);
			const carte = await Carte.findByPk(carteId);
			// const test = await label.getCartesList();
			const addLabelToCarte = await label.addCartesList(carte);

			console.log(addLabelToCarte);
			res.json(addLabelToCarte);
		} catch (error) {
			console.error(error);
		}
	},
	removeLabelFromCarte: async (req, res) => {
		try {
			const labelId = Number(req.params.labelId);
			const carteId = Number(req.params.carteId);

			if (isNaN(labelId) || isNaN(carteId)) {
				throw new Error("Un problème avec l'id");
			}

			const label = await Label.findByPk(labelId);
			const carte = await Carte.findByPk(carteId);
			// const test = await label.getCartesList();
			const addLabelToCarte = await label.removeCartesList(carte);

			console.log(addLabelToCarte);

			res.json(addLabelToCarte);
		} catch (error) {
			console.error(error);
		}
	},
};

module.exports = labelController;
