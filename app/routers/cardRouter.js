const { Router } = require("express");
const router = Router();
const cardController = require("../controllers/cardController");
const cw = require("./../middlewares/controllerErrorWrapper");

router.get("/cards", cw(cardController.getAllCards));
router.post("/cards", cw(cardController.createCard));
router.post(
	"/cards/:cardId/position/:positionId",
	cw(cardController.updatePosition)
);
router.get("/lists/:id/cards", cw(cardController.getCardsFromList));
router.get("/cards/:id", cw(cardController.getOneCard));
router.patch("/cards/:id", cw(cardController.updateCard));
router.delete("/cards/:id", cw(cardController.deleteCard));

module.exports = router;
