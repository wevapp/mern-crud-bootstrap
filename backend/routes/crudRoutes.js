const express = require("express");
const router = express.Router();

const {
  getItems,
  getSingleItem,
  createItem,
  deletedItem,
  updatedItem,
} = require("../controllers/crudControllers");

// Item route
router.route("/").get(getItems).post(createItem);
router.route("/:id").get(getSingleItem).delete(deletedItem).patch(updatedItem);

module.exports = router;
