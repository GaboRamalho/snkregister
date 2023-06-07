const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Sneakers = new Schema({
  name: {
    type: String
  },
  brand: {
    type: String
  },
  size: {
    type: Number
  }
},
{
    collection: 'sneakers'
});

module.exports = mongoose.model('Sneakers', Sneakers);