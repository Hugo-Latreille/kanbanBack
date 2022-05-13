const { Router } = require("express");
const router = Router();
const tagController = require("../controllers/tagController");
const cw = require("./../middlewares/controllerErrorWrapper");

router.get("/tags", cw(tagController.getAllTags));
router.post("/tags", cw(tagController.createTag));
router.get("/tags/:id", cw(tagController.getOneTag));
router.delete("/tags/:id", cw(tagController.deleteTag));

router.put("/cards/:cards_id/tags/:tags_id", cw(tagController.addTagToCard));
router.delete(
	"/cards/:cards_id/tags/:tags_id",
	cw(tagController.removeTagFromCard)
);

module.exports = router;
