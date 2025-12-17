const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true, default: '#3388ff' },
  position: { type: [Number], default: [0, 0, 0] } // [x, y, z]
});

module.exports = mongoose.model('Model', ModelSchema);