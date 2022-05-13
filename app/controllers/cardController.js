const { Card, List } = require("../models/");
const { Op } = require("sequelize");

const cardController = {
	getAllCards: async (req, res) => {
		try {
			// const listes = await Liste.findAll();
			const allCards = await Card.findAll({
				order: [["position", "ASC"], ["created_at", "DESC"]],
				include: {association: "cards"}
			});
			res.json(allCards);
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
			const oneCardWithTags = await Card.findByPk(id, {
                include: ["tags"]
            });

            if (!oneCardWithTags) {
				res
					.status(404)
					.json({ "error": "List not found. Please verify the provided id." });
					return;
			}

			res.json(oneCardWithTags);
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
			

			if (isNaN(cardId) || isNaN(positionId)) {
				throw new Error("Un problème avec l'id");
			} 

			const getCard = await Card.findByPk(cardId)		

			// get.card.position = ancienne position
			//positionId = nouvelle position

			//Si nouvelle position < ancienne : on incrémente + 1 toutes les positions supérieures à la nouvelle sauf les positions supérieures ou égales à l'ancienne

			// Si nouvelle position > ancienne : 

			
			const updateOtherCardsPositionsInList = await Card.increment({
				position: 1
			}, {where:{
				[Op.and]: [
					{ position: {
						
						[Op.gte]: positionId
			}}, 
					{list_id: getCard.list_id}]
			}})

			const updateCardPosition = await Card.update(
				{ position: positionId },
				{
					where: { id: cardId },
				}
			);

			

			// ne récup que cartes dans une liste ! et faire position décrément !!!
		res.json(getCard)
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
    getCardsFromList: async(req, res) => {
        try {
            const id = Number(req.params.id);
			if (isNaN(id)) {
				throw new Error("Un problème avec l'id");
			}

            const getCardsFromListWithTags = await Card.findAll({
                where: {list_id: id}, 
                include: ["tags"]
            })

            res.status(200).json(getCardsFromListWithTags)


        } catch (error) {
            console.error(error);
            res
				.status(500)
				.json({ "error": "Unexpected server error. Please try again later." });
        }

    },
};

module.exports = cardController;
