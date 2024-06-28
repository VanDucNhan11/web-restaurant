const Position = require('../models/Position.model');

const getAllPositions = async (req, res) => {
  try {
    const positions = await Position.find();
    res.status(200).json(positions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createPosition = async (req, res) => {
  try {
    const { namePosition } = req.body;
    const newPosition = new Position({ namePosition });
    await newPosition.save();
    res.status(201).json(newPosition);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllPositions,
  createPosition,
};
