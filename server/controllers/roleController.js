const Role = require('../models/Role.model');

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createRole = async (req, res) => {
  try {
    const { nameRole } = req.body;
    const newRole = new Role({ nameRole });
    await newRole.save();
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllRoles,
  createRole,
};
