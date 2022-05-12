const express = require("express");
const router = express.Router();
const listeController = require("./controllers/listeController");
const carteController = require("./controllers/carteController");
const labelController = require("./controllers/labelController");

//listeController
router.get("/listes", listeController.getAllListes);
router.post("/listes", listeController.createListe);

router.get("/liste/:id", listeController.getOneListe);
router.put("/liste/:id", listeController.updateListe); //ou patch
router.delete("/liste/:id", listeController.deleteListe);

// carteController
router.get("/cartes", carteController.getAllCartes);
router.post("/cartes", carteController.createCarte);

router.get("/carte/:id", carteController.getOneCarte);
router.put("/carte/:id", carteController.updateCarte);
router.delete("/carte/:id", carteController.deleteCarte);

//labelController
router.get("/labels");
router.post("/labels");
router.post("/label/:labelId/carte/:carteId", labelController.addLabelToCarte);
router.put("/label/:id"); //ou patch
router.delete("/label/:id");

module.exports = router;
