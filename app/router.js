const express = require("express");
const router = express.Router();
const listController = require("./controllers/listController");
const cardController = require("./controllers/cardController");
const tagController = require("./controllers/tagController");

//listeController
router.get("/listes", listController.getAllLists);
router.post("/listes", listController.createList);

router.get("/liste/:id", listController.getOneList);
router.put("/liste/:id", listController.updateList); //ou patch
router.delete("/liste/:id", listController.deleteList);

// carteController
router.get("/cartes", cardController.getAllCards);
router.post("/cards", cardController.createCard);
router.post("/card/card:Id/position/:positionId", cardController.createCard);

router.get("/card/:id", cardController.getOneCard);
router.put("/card/:id", cardController.updateCard);
router.delete("/card/:id", cardController.deleteCard);

//labelController
router.get("/labels");
router.post("/labels");
router.put("/label/:id"); //ou patch
router.delete("/label/:id");

router.post("/label/:labelId/card/:cardId", labelController.addLabelToCard);
router.delete(
	"/label/:labelId/card/:cardId",
	labelController.removeLabelFromCard
);

module.exports = router;
