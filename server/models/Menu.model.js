const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  tenMon: { type: String, required: true },
  moTa: { type: String, required: true },
  gia: { type: Number, required: true },
  image: { type: String, required: true },
  danhMucID: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
