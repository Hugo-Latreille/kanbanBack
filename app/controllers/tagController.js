const { Tag, Card } = require("../models/");

const tagController = {
	getAllTags: async (req, res) => {
		try {
			// const listes = await Liste.findAll();
			const tagAvecListeEtTags = await tag.findAll();
			res.status(200).json(tagAvecListeEtTags);
		} catch (error) {
			console.error(error);
            res
				.status(500)
				.json({ "error": "Unexpected server error. Please try again later." });
		}
	},
	getOneTag: async (req, res) => {
		try {
			const id = Number(req.params.id);
			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}
			const oneTag = await tag.findByPk(id);

            if (!oneTag) {
				res
					.status(404)
					.json({ "error": "List not found. Please verify the provided id." });
			}
			res.json(oneTag);
		} catch (error) {
			console.error(error);
            res
				.status(500)
				.json({ "error": "Unexpected server error. Please try again later." });
		}
	},
	createTag: async (req, res) => {
		try {
			const formData = req.body;
            const{name, color} = req.body
			console.log(formData);

            if (!name) {
				res.status(400).json({ "error": "Missing body parameter: name" });
				return;
			}

            if (!color) {
				res.status(400).json({ "error": "Missing body parameter: color" });
				return;
			}

			if (name && typeof name !== "string") {
				res
					.status(400)
					.json({ "error": "Invalid type: name should be a string" });
				return;
			}
			if (color && typeof color !== "string") {
				res
					.status(400)
					.json({ "error": "Invalid type: 'color' should be a string " });
				return;
			}
			
			await Tag.create(formData);

			res.send("Nouveau tag créée");
		} catch (error) {
			console.error(error);
            res
				.status(500)
				.json({ "error": "Unexpected server error. Please try again later." });
		}
	},
	updateTag: async (req, res) => {
		try {
			const id = Number(req.params.id);
			const body = req.body;
            const{name, color} = req.body
			console.log(id, req.body);

			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}

            const checkTag = await Tag.findByPk(id)
            if (!checkTag) {
				res
					.status(404)
					.json({ "error": "Tag not found. Please verify the provided id." });
				return;
			}
            
            if (name && typeof name !== "string") {
				res
					.status(400)
					.json({ "error": "Invalid type: name should be a string" });
				return;
			}
            if (color && typeof color !== "string") {
				res
					.status(400)
					.json({ "error": "Invalid type: color should be a string" });
				return;
			}

			if (!name && !color) {
				res.status(400).json({
					"error":
						"Invalid body. Should provide at least a 'name' or 'color' property",
				});
				return;
			}

			const updateTag = await Tag.update(body, {
				where: { id },
			});
			res.json(updateTag);
		} catch (error) {
			console.error(error);
            res
				.status(500)
				.json({ "error": "Unexpected server error. Please try again later." });
		}
	},
	deleteTag: async (req, res) => {
		try {
			const id = Number(req.params.id);

			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}

			const tagToDelete = await Tag.findByPk(id);
            if (!tagToDelete) {
				res
					.status(404)
					.json({ "error": "Tag not found. Please verify the provided id." });
				return;
			}
			tagToDelete.destroy();
			res.send("tag supprimée");
		} catch (error) {
			console.error(error);
            res
				.status(500)
				.json({ "error": "Unexpected server error. Please try again later." });
		}
	},
	addTagToCard: async (req, res) => {
		try {
			const tagId = Number(req.params.tags_id);
			const carteId = Number(req.params.cards_id);

			if (isNaN(tagId) || isNaN(carteId)) {
				throw new Error("Un problème avec l'id");
			}

			const tag = await Tag.findByPk(tagId);
			const carte = await Card.findByPk(carteId);
			// const test = await tag.getCartesList();
			const addTagToCard = await tag.addCards(carte);
			
			res.status(200).json(addTagToCard);
		} catch (error) {
			console.error(error);
            res
				.status(500)
				.json({ "error": "Unexpected server error. Please try again later." });
		}
	},
	removeTagFromCard: async (req, res) => {
		try {
			const tagId = Number(req.params.tags_id);
			const carteId = Number(req.params.cards_id);

			if (isNaN(tagId) || isNaN(carteId)) {
				throw new Error("Un problème avec l'id");
			}

			const tag = await Tag.findByPk(tagId);
			const carte = await Card.findByPk(carteId);
			// const test = await tag.getCartesList();
			const removeTagFromCard = await tag.removeCards(carte);

			res.json(removeTagFromCard);
		} catch (error) {
			console.error(error);
            res
				.status(500)
				.json({ "error": "Unexpected server error. Please try again later." });
		}
	},
};

module.exports = tagController;
