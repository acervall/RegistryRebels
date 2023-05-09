const mongoose = require('mongoose')

const RsvpSchema = new mongoose.Schema({
  participants: [
    {
      group: [
        {
          person: {
            name: {
              type: String,
              required: true,
            },
            foodChoice: {
              type: [String],
            },
          },
          attending: {
            type: Boolean,
            default: true,
          },
        },
      ],
    },
  ],
})

module.exports = mongoose.model('party', RsvpSchema)
