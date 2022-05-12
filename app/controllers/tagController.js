const { Tag, Card } = require("../models/");

const tagController = {
	getAllTags: async (req, res) => {
		try {
			// const listes = await Liste.findAll();
			const tagAvecListeEtTags = await tag.findAll({
				include: ["tags", "liste"],
			});
			res.json(tagAvecListeEtTags);
		} catch (error) {
			console.error(error);
		}
	},
	getOneTag: async (req, res) => {
		try {
			const id = Number(req.params.id);
			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}
			const oneTag = await tag.findByPk(id);
			res.json(oneTag);
		} catch (error) {
			console.error(error);
		}
	},
	createTag: async (req, res) => {
		try {
			const formData = req.body;
			console.log(formData);
			// const liste = {
			// 	nom: "Brigitte",
			// 	position: 3,
			// };
			await Tag.create(formData);

			res.send("Nouveau tag créée");
		} catch (error) {
			console.error(error);
		}
	},
	updateTag: async (req, res) => {
		try {
			const id = Number(req.params.id);
			const body = req.body;
			console.log(id, req.body);

			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}

			const updateTag = await tag.update(body, {
				where: { id },
			});
			res.json(updateTag);
		} catch (error) {
			console.error(error);
		}
	},
	deleteTag: async (req, res) => {
		try {
			const id = Number(req.params.id);

			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}

			const tagToDelete = await tag.findByPk(id);
			tagToDelete.destroy();
			res.send("tag supprimée");
		} catch (error) {
			console.error(error);
		}
	},
	addTagToCard: async (req, res) => {
		try {
			const tagId = Number(req.params.tagId);
			const carteId = Number(req.params.carteId);

			if (isNaN(tagId) || isNaN(carteId)) {
				throw new Error("Un problème avec l'id");
			}

			const tag = await tag.findByPk(tagId);
			const carte = await Carte.findByPk(carteId);
			// const test = await tag.getCartesList();
			const addTagToCarte = await tag.addCartesList(carte);

			console.log(addTagToCarte);
			res.json(addTagToCarte);
		} catch (error) {
			console.error(error);
		}
	},
	removeTagFromCard: async (req, res) => {
		try {
			const tagId = Number(req.params.tagId);
			const carteId = Number(req.params.carteId);

			if (isNaN(tagId) || isNaN(carteId)) {
				throw new Error("Un problème avec l'id");
			}

			const tag = await tag.findByPk(tagId);
			const carte = await Carte.findByPk(carteId);
			// const test = await tag.getCartesList();
			const addTagToCarte = await tag.removeCartesList(carte);

			console.log(addTagToCarte);

			res.json(addTagToCarte);
		} catch (error) {
			console.error(error);
		}
	},
};

module.exports = tagController;
