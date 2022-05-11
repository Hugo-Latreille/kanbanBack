const { Liste } = require("../models/");

const listeController = {
	getAllListes: async (req, res) => {
		try {
			// const listes = await Liste.findAll();
			const ListeAvecCartesEtLabels = await Liste.findAll({
				include: [{ association: "cartes", include: ["labels"] }],
			});
			res.json(ListeAvecCartesEtLabels);
		} catch (error) {
			console.error(error);
		}
	},
	getOneListe: async (req, res) => {
		try {
			const id = Number(req.params.id);
			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}
			const oneListe = await Liste.findByPk(id);
			res.json(oneListe);
		} catch (error) {
			console.error(error);
		}
	},
	createListe: async (req, res) => {
		try {
			const formData = req.body;
			console.log(formData);
			// const liste = {
			// 	nom: "Brigitte",
			// 	position: 3,
			// };
			await Liste.create(formData);

			res.send("Nouvelle liste créée");
		} catch (error) {
			console.error(error);
		}
	},
	updateListe: async (req, res) => {
		try {
			const id = Number(req.params.id);
			const body = req.body;
			console.log(id, req.body);

			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}

			const updateListe = await Liste.update(body, {
				where: { id },
			});
			res.json(updateListe);
		} catch (error) {
			console.error(error);
		}
	},
	deleteListe: async (req, res) => {
		try {
			const id = Number(req.params.id);

			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}

			const listeToDelete = await Liste.findByPk(id);
			listeToDelete.destroy();
			res.send("Liste supprimée");
		} catch (error) {
			console.error(error);
		}
	},
};

module.exports = listeController;
