const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  nameRole: { type: String, required: true }
});

module.exports = mongoose.model('Role', roleSchema);