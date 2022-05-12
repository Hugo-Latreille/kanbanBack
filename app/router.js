const express = require("express");
const router = express.Router();
const listController = require("./controllers/listController");
const cardController = require("./controllers/cardController");
const tagController = require("./controllers/tagController");

//listeController
router.get("/lists", listController.getAllLists);
router.post("/lists", listController.createList);

router.get("/lists/:id", listController.getOneList);
// router.put("/lists/:id", listController.updateList); //ou patch
router.patch("/lists/:id", listController.updateList);
router.delete("/lists/:id", listController.deleteList);

// carteController
router.get("/cards", cardController.getAllCards);
router.post("/cards", cardController.createCard);
router.post("/card/card:Id/position/:positionId", cardController.createCard);
router.get("/lists/:id/cards", cardController.getCardsFromList)
router.get("/cards/:id", cardController.getOneCard);
router.patch("/cards/:id", cardController.updateCard);
router.delete("/cards/:id", cardController.deleteCard);

//labelController
router.get("/tags");
router.post("/tags");
router.put("/tag/:id"); //ou patch
router.delete("/tag/:id");

router.post("/tag/:tagId/card/:cardId", tagController.addTagToCard);
router.delete("/tag/:tagId/card/:cardId", tagController.removeTagFromCard);

module.exports = router;
