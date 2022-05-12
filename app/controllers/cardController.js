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
		}
	},
	getOneCard: async (req, res) => {
		try {
			const id = Number(req.params.id);
			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}
			const oneCard = await Card.findByPk(id);
			res.json(oneCard);
		} catch (error) {
			console.error(error);
		}
	},
	createCard: async (req, res) => {
		try {
			const formData = req.body;
			console.log(formData);
			// const liste = {
			// 	nom: "Brigitte",
			// 	position: 3,
			// };
			await Card.create(formData);

			res.send("Nouvelle card créée");
		} catch (error) {
			console.error(error);
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
		}
	},
	updateCard: async (req, res) => {
		try {
			const id = Number(req.params.id);
			const body = req.body;
			console.log(id, req.body);

			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}

			const updateCard = await Card.update(body, {
				where: { id },
			});
			res.json(updateCard);
		} catch (error) {
			console.error(error);
		}
	},
	deleteCard: async (req, res) => {
		try {
			const id = Number(req.params.id);

			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}

			const cardToDelete = await Card.findByPk(id);
			cardToDelete.destroy();
			res.send("Card supprimée");
		} catch (error) {
			console.error(error);
		}
	},
};

module.exports = cardController;
