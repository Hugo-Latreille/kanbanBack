const { Router } = require("express")
const router = Router()
const cardController = require("../controllers/cardController");
const cw = require("./../middlewares/controllerErrorWrapper")


router.get("/cards", cardController.getAllCards);
router.post("/cards", cardController.createCard);
router.post("/cards/:cardId/position/:positionId", cardController.updatePosition);
router.get("/lists/:id/cards", cardController.getCardsFromList)
router.get("/cards/:id", cardController.getOneCard);
router.patch("/cards/:id", cardController.updateCard);
router.delete("/cards/:id", cardController.deleteCard);


module.exports = router;