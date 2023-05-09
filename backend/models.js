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
              type: [String], // Ersätt `Array` med `[String]` för att ange att foodChoice-fältet ska vara en array av strängar.
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
