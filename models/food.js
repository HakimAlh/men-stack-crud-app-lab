const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;