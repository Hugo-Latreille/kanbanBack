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
router.post("/cards/:cardId/position/:positionId", cardController.updatePosition);
router.get("/lists/:id/cards", cardController.getCardsFromList)
router.get("/cards/:id", cardController.getOneCard);
router.patch("/cards/:id", cardController.updateCard);
router.delete("/cards/:id", cardController.deleteCard);

//labelController
router.get("/tags", tagController.getAllTags);
router.post("/tags", tagController.createTag);
router.patch("/tag/:id", tagController.getOneTag);
router.delete("/tag/:id", tagController.deleteTag);

router.put("/cards/:cards_id/tags/:tags_id", tagController.addTagToCard);
router.delete("/cards/:cards_id/tags/:tags_id", tagController.removeTagFromCard);

module.exports = router;
