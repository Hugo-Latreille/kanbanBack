const { Card } = require("../models/");
const { Op } = require("sequelize");

const cardController = {
	getAllCards: async (req, res) => {
		const allCards = await Card.findAll({
			order: [
				["position", "ASC"],
				["created_at", "DESC"],
			],
			// include: { association: "tags" },
			// where: { list_id: 1 }, // pour tester les positions
		});
		res.json(allCards);
	},
	getOneCard: async (req, res) => {
		const id = Number(req.params.id);
		if (isNaN(id)) {
			res
				.status(404)
				.json({ error: "List not found. Please verify the provided id." });
		}
		const oneCardWithTags = await Card.findByPk(id, {
			include: ["tags"],
		});

		if (!oneCardWithTags) {
			res
				.status(404)
				.json({ error: "List not found. Please verify the provided id." });
			return;
		}

		res.json(oneCardWithTags);
	},
	createCard: async (req, res) => {
		const formData = req.body;
		const { content, color, position } = req.body;
		console.log(formData);

		// if (!content) {
		// 	res.status(400).json({ error: "Missing body parameter: name" });
		// 	return;
		// }
		if (!color) {
			res.status(400).json({ error: "Missing body parameter: color" });
			return;
		}
		if (!position) {
			res.status(400).json({ error: "Missing body parameter: position" });
			return;
		}

		if (
			(content && typeof content !== "string") ||
			(color && typeof color !== "string")
		) {
			res
				.status(400)
				.json({ error: "Invalid type: content and color should be a string" });
			return;
		}
		if (position && typeof position !== "number") {
			res
				.status(400)
				.json({ error: "Invalid type: position should be a number" });
			return;
		}

		const newCard = await Card.create(formData);

		res.status(201).json(newCard);
	},
	updatePosition: async (req, res) => {
		const cardId = Number(req.params.cardId);
		const positionId = Number(req.params.positionId);

		if (isNaN(cardId) || isNaN(positionId)) {
			res
				.status(404)
				.json({ error: "List not found. Please verify the provided id." });
		}

		const getCard = await Card.findByPk(cardId);

		//!getCard.position = ancienne position
		//!positionId = nouvelle position

		//* Au sein de la liste correspondante, si nouvelle position < ancienne : on incrémente + 1 toutes les positions >= à la nouvelle sauf les positions >= à l'ancienne

		if (positionId < getCard.position) {
			await Card.increment(
				{
					position: 1,
				},
				{
					where: {
						[Op.and]: [
							{
								position: {
									[Op.gte]: positionId,
									[Op.lt]: getCard.position,
								},
							},
							{ list_id: getCard.list_id },
						],
					},
				}
			);
		}

		//* Si nouvelle position > ancienne : positions avant ancienne =, positions supérieures la nouvelle =, entre les deux positions : decrement -1

		if (positionId > getCard.position) {
			await Card.increment(
				{
					position: -1,
				},
				{
					where: {
						[Op.and]: [
							{
								position: {
									[Op.gt]: getCard.position,
									[Op.lte]: positionId,
								},
							},
							{ list_id: getCard.list_id },
						],
					},
				}
			);
		}
		const updateCardPosition = await Card.update(
			{ position: positionId },
			{
				where: { id: cardId },
			}
		);
		res.json(updateCardPosition);
	},
	updateCard: async (req, res) => {
		const id = Number(req.params.id);
		const body = req.body;
		const { content, color, position } = req.body;
		console.log(id, req.body);

		if (isNaN(id)) {
			res
				.status(404)
				.json({ error: "List not found. Please verify the provided id." });
		}
		if (
			(content && typeof content !== "string") ||
			(color && typeof color !== "string")
		) {
			res
				.status(400)
				.json({ error: "Invalid type: content and color should be a string" });
			return;
		}
		if (position && typeof position !== "number") {
			res
				.status(400)
				.json({ error: "Invalid type: position should be a number" });
			return;
		}
		if (!content && !color && !position) {
			res.status(400).json({
				error:
					"Invalid body. Should provide at least a 'content' or 'color' or 'position' property",
			});
		}

		const updateCard = await Card.update(body, {
			where: { id },
		});
		res.json(updateCard);
	},
	deleteCard: async (req, res) => {
		const id = Number(req.params.id);

		if (isNaN(id)) {
			res
				.status(404)
				.json({ error: "List not found. Please verify the provided id." });
		}

		const cardToDelete = await Card.findByPk(id);

		if (!cardToDelete) {
			res
				.status(404)
				.json({ error: "List not found. Please verify the provided id." });
			return;
		}

		cardToDelete.destroy();
		res.status(204).send("Card supprimée");
	},
	getCardsFromList: async (req, res) => {
		const id = Number(req.params.id);
		if (isNaN(id)) {
			res
				.status(404)
				.json({ error: "List not found. Please verify the provided id." });
		}

		const getCardsFromListWithTags = await Card.findAll({
			where: { list_id: id },
			include: ["tags"],
		});

		res.status(200).json(getCardsFromListWithTags);
	},
};

module.exports = cardController;
