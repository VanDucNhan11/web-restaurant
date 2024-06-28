const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
  namePosition: { type: String, required: true }
});

module.exports = mongoose.model('Position', positionSchema)