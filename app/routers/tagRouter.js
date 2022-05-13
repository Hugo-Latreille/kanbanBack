const { Router } = require("express")
const router = Router()
const tagController = require("../controllers/tagController");


router.get("/tags", tagController.getAllTags);
router.post("/tags", tagController.createTag);
router.patch("/tag/:id", tagController.getOneTag);
router.delete("/tag/:id", tagController.deleteTag);

router.put("/cards/:cards_id/tags/:tags_id", tagController.addTagToCard);
router.delete("/cards/:cards_id/tags/:tags_id", tagController.removeTagFromCard);


module.exports = router;