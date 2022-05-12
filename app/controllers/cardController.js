const { Card } = require("../models/");

const cardController = {
	getAllCards: async (req, res) => {
		try {
			// const listes = await Liste.findAll();
			const cardAvecListeEtLabels = await Card.findAll({
				include: ["labels", "liste"],
			});
			res.json(cardAvecListeEtLabels);
		} catch (error) {
			console.error(error);
            res
				.status(500)
				.json({ "error": "Unexpected server error. Please try again later." });
		}
	},
	getOneCard: async (req, res) => {
		try {
			const id = Number(req.params.id);
			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}
			const oneCard = await Card.findByPk(id);

            if (!oneCard) {
				res
					.status(404)
					.json({ "error": "List not found. Please verify the provided id." });
			}

			res.json(oneCard);
		} catch (error) {
			console.error(error);
            res
				.status(500)
				.json({ "error": "Unexpected server error. Please try again later." });
		}
	},
	createCard: async (req, res) => {
		try {
			const formData = req.body;
            const {content, color, position} = req.body
			console.log(formData);
		
            if (!content) {
				res.status(400).json({ "error": "Missing body parameter: name" });
				return;
			}
            if (!color) {
				res.status(400).json({ "error": "Missing body parameter: color" });
				return;
			}
            if (!position) {
				res.status(400).json({ "error": "Missing body parameter: position" });
				return;
			}

			if (content && typeof content !== "string" || color && typeof color !== "string" ) {
				res
					.status(400)
					.json({ "error": "Invalid type: content and color should be a string" });
				return;
			}
			if (position && typeof position !== "number") {
				res
					.status(400)
					.json({ "error": "Invalid type: position should be a number" });
				return;
			}

			await Card.create(formData);

			res.send("Nouvelle card créée");
		} catch (error) {
			console.error(error);
            res
				.status(500)
				.json({ "error": "Unexpected server error. Please try again later." });
		}
	},
	updatePosition: async (req, res) => {
		try {
			const cardId = Number(req.params.cardId);
			const positionId = Number(req.params.positionId);
			const body = req.body;
			console.log(id, req.body);

			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}            

			const updateCardPosition = await Card.update(
				{ position: positionId },
				{
					where: { id: cardId },
				}
			);

			res.json(updateCardPosition);
		} catch (error) {
			console.error(error);
            res
				.status(500)
				.json({ "error": "Unexpected server error. Please try again later." });
		}
	},
	updateCard: async (req, res) => {
		try {
			const id = Number(req.params.id);
			const body = req.body;
            const {content, color, position} = req.body
			console.log(id, req.body);
            

			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}
            if (content && typeof content !== "string" || color && typeof color !== "string" ) {
				res
					.status(400)
					.json({ "error": "Invalid type: content and color should be a string" });
				return;
			}
			if (position && typeof position !== "number") {
				res
					.status(400)
					.json({ "error": "Invalid type: position should be a number" });
				return;
			}
            if (!content && !color && !position) {
				res.status(400).json({
					"error":
						"Invalid body. Should provide at least a 'content' or 'color' or 'position' property",
				});
            } 

			const updateCard = await Card.update(body, {
				where: { id },
			});
			res.json(updateCard);
		} catch (error) {
			console.error(error);
            res
				.status(500)
				.json({ "error": "Unexpected server error. Please try again later." });
		}
	},
	deleteCard: async (req, res) => {
		try {
			const id = Number(req.params.id);

			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}

			const cardToDelete = await Card.findByPk(id);

            if (!cardToDelete) {
				res
					.status(404)
					.json({ "error": "List not found. Please verify the provided id." });
				return;
			}

			cardToDelete.destroy();
			res.send("Card supprimée");
		} catch (error) {
			console.error(error);
            res
				.status(500)
				.json({ "error": "Unexpected server error. Please try again later." });
		}
	},
};

module.exports = cardController;
