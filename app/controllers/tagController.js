const { Tag, Card } = require("../models/");
const CardHasTag = require("../models/cardHasTag");

const tagController = {
	getAllTags: async (req, res) => {
		// const listes = await Liste.findAll();
		const tagAvecListeEtTags = await tag.findAll();
		res.status(200).json(tagAvecListeEtTags);
	},
	getOneTag: async (req, res) => {
		const id = Number(req.params.id);
		if (isNaN(id)) {
			res
				.status(404)
				.json({ error: "List not found. Please verify the provided id." });
		}
		const oneTag = await Tag.findByPk(id);

		if (!oneTag) {
			return res
				.status(404)
				.json({ error: "List not found. Please verify the provided id." });
		}
		res.status(200).json(oneTag);
	},
	createTag: async (req, res) => {
		const formData = req.body;
		const { name, color } = req.body;
		console.log(formData);

		if (!name) {
			res.status(400).json({ error: "Missing body parameter: name" });
			return;
		}

		if (!color) {
			res.status(400).json({ error: "Missing body parameter: color" });
			return;
		}

		if (name && typeof name !== "string") {
			res.status(400).json({ error: "Invalid type: name should be a string" });
			return;
		}
		if (color && typeof color !== "string") {
			res
				.status(400)
				.json({ error: "Invalid type: 'color' should be a string " });
			return;
		}

		const newTag = await Tag.create(formData);

		res.status(201).json(newTag);
	},
	updateTag: async (req, res) => {
		const id = Number(req.params.id);
		const body = req.body;
		const { name, color } = req.body;
		console.log(id, req.body);

		if (isNaN(id)) {
			res
				.status(404)
				.json({ error: "List not found. Please verify the provided id." });
		}

		const checkTag = await Tag.findByPk(id);
		if (!checkTag) {
			res
				.status(404)
				.json({ error: "Tag not found. Please verify the provided id." });
			return;
		}

		if (name && typeof name !== "string") {
			res.status(400).json({ error: "Invalid type: name should be a string" });
			return;
		}
		if (color && typeof color !== "string") {
			res.status(400).json({ error: "Invalid type: color should be a string" });
			return;
		}

		if (!name && !color) {
			res.status(400).json({
				error:
					"Invalid body. Should provide at least a 'name' or 'color' property",
			});
			return;
		}

		const updateTag = await Tag.update(body, {
			where: { id },
		});
		res.json(updateTag);
	},
	deleteTag: async (req, res) => {
		const id = Number(req.params.id);

		if (isNaN(id)) {
			res
				.status(404)
				.json({ error: "List not found. Please verify the provided id." });
		}

		const tagToDelete = await Tag.findByPk(id);
		if (!tagToDelete) {
			res
				.status(404)
				.json({ error: "Tag not found. Please verify the provided id." });
			return;
		}
		tagToDelete.destroy();
		res.status(204).send("tag supprimé");
	},
	addTagToCard: async (req, res) => {
		const tagId = Number(req.params.tags_id);
		const carteId = Number(req.params.cards_id);

		if (isNaN(tagId) || isNaN(carteId)) {
			res
				.status(404)
				.json({ error: "List not found. Please verify the provided id." });
		}

		const tag = await Tag.findByPk(tagId);
		const carte = await Card.findByPk(carteId);
		if (!tag || !carte) {
			res.status(404).json({
				error: "Tag or carte not found. Please verify the provided ids.",
			});
			return;
		}
		// const test = await tag.getCartesList();
		const addTagToCard = await tag.addCards(carte);

		res.status(200).json(addTagToCard);
	},
	removeTagFromCard: async (req, res) => {
		const tagId = Number(req.params.tags_id);
		const carteId = Number(req.params.cards_id);

		if (isNaN(tagId) || isNaN(carteId)) {
			res
				.status(404)
				.json({ error: "List not found. Please verify the provided id." });
		}

		const tag = await Tag.findByPk(tagId);
		const carte = await Card.findByPk(carteId);

		if (!tag || !carte) {
			res.status(404).json({
				error: "Tag or carte not found. Please verify the provided ids.",
			});
			return;
		}
		const removeTagFromCard = await tag.removeCards(carte);

		res.json(removeTagFromCard);
	},
};

module.exports = tagController;
