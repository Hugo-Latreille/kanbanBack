const { Router } = require("express");
const router = Router();
const listController = require("../controllers/listController");
const cw = require("./../middlewares/controllerErrorWrapper");

router.get("/lists", cw(listController.getAllLists));
router.post("/lists", cw(listController.createList));

router.get("/lists/:id", cw(listController.getOneList));
router.patch("/lists/:id", cw(listController.updateList));
router.delete("/lists/:id", cw(listController.deleteList));

module.exports = router;
