const MenuItem = require('../models/Menu.model');
const fs = require('fs');
const path = require('path');

exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find().populate('categoryID');
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createMenuItem = async (req, res) => {
  const { itemName, description, price, categoryID } = req.body;
  let image = req.file ? req.file.path : '';

  if (req.file) {
    const newImagePath = `${req.file.path}.png`;
    fs.renameSync(req.file.path, newImagePath);
    image = newImagePath;
  }

  try {
    const newMenuItem = new MenuItem({
      itemName,
      description,
      price,
      image,
      categoryID
    });

    await newMenuItem.save();
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { itemName, description, price, categoryID } = req.body;
  let image = req.file ? req.file.path : '';

  if (req.file) {
    const newImagePath = `${req.file.path}.png`;
    fs.renameSync(req.file.path, newImagePath);
    image = newImagePath;
  }

  try {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, {
      itemName,
      description,
      price,
      image: image || req.body.image,
      categoryID
    }, { new: true });

    res.json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    await MenuItem.findByIdAndDelete(id);
    res.json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
