const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  name: String,
  password: String,
  currentList: [
    {
      name: String,
      price: Number,
      checked: {
        type: Boolean,
        default: false,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  favorites: [
    {
      name: String,
      price: Number,
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
})

module.exports = mongoose.model('Room', roomSchema)
