const mongoose = require('mongoose')

const RsvpSchema = new mongoose.Schema({
  participants: [
    {
      name: {
        type: String,
        required: true,
      },
      foodChoice: {
        type: [String],
      },
      attending: {
        type: Boolean,
        default: true,
      },
      group: {
        type: Number,
        required: true,
      },
    },
  ],
})

module.exports = mongoose.model('party', RsvpSchema)
