const express = require("express");
const router = express.Router();
const listeController = require("./controllers/listeController");

//listeController
router.get("/listes", listeController.getAllListes);
router.post("/listes", listeController.createListe);

router.get("/liste/:id", listeController.getOneListe);
router.put("/liste/:id", listeController.updateListe); //ou patch
router.delete("/liste/:id", listeController.deleteListe);

// carteController
router.get("/cartes");
router.post("/cartes");
router.put("/carte/:id");
router.delete("/carte/:id");

//labelController
router.get("/labels");
router.post("/labels");
router.post("/label/:id/card/:id");
router.put("/label/:id"); //ou patch
router.delete("/label/:id");

module.exports = router;
