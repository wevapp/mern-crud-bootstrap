const mongoose = require("mongoose");
// access table from database
const Item = require("../models/crudModels");

// @desc Get all items
// @route GET /api/
// @access Public
const getItems = async (req, res) => {
  const items = await Item.find({});
  res.status(200).json(items);
};

// @desc Get single item
// @route GET /api/:id
// @access Public
const getSingleItem = async (req, res) => {
  const { id } = req.params;

  // check if valid id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: `Invalid item id` });
  }

  const item = await Item.findById(id);

  // check item if exist
  if (!item) {
    return res.status(404).json({ message: `Item not exist` });
  }

  res.status(200).json(item);
};

// @desc Set new item
// @route POST /api/
// @access Public
const createItem = async (req, res) => {
  const { item, price } = req.body;

  // Check field if empty
  if (!item || !price) {
    return res.status(400).json({ message: "Fill out all fields" });
  }

  const newItem = await Item.create({ item, price });
  res.status(201).json({ message: "Added new item to database" });
};

// @desc Delete item
// @route DELETE /api/:id
// @access Public
const deletedItem = async (req, res) => {
  const { id } = req.params;

  // check the id if valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: `Invalid item id` });
  }

  // removed item from database
  const item = await Item.findOneAndDelete({ _id: id });

  // check if item not exist
  if (!item) {
    return res.status(404).json({ message: `Item does not exist` });
  }

  res.status(200).json({ message: `Removed Item from database` });
};

// @desc Update item
// @route PATCH /api/:id
// @access Public
const updatedItem = async (req, res) => {
  const { id } = req.params;
  // check if the id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: `Invalid item id` });
  }

  const item = await Item.findOneAndUpdate({ _id: id }, { ...req.body });

  // check if item not exist
  if (!item) {
    return res.status(404).json({ message: `Item does not exist` });
  }

  res.status(200).json({ message: "Updated Item" });
};

// Export all functions
module.exports = {
  getItems,
  getSingleItem,
  createItem,
  deletedItem,
  updatedItem,
};
