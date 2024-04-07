const express = require("express");
const listsController = require("../controllers/listsController");

const router = express.Router();

router.get("/", listsController.getAllLists);
router.get("/:id", listsController.getListById);
router.post("/", listsController.createList);
router.put("/:id", listsController.updateList);
router.delete("/:id", listsController.deleteList);

module.exports = router;
