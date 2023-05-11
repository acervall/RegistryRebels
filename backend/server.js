const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const PartyModel = require('./models')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
app.use(express.static('public'))
const port = 3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const start = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/devmongoshparty')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
start()

// Routes
const product = require('./routes/product')
app.use(product)

const category = require('./routes/category')
app.use(category)

const productList = require('./routes/product-list')
app.use(productList)

const userProductList = require('./routes/user-product-list')
app.use(userProductList)

const guest = require('./routes/guest')
app.use(guest)

const user = require('./routes/user')
app.use(user)

// app.use(function (err, req, res) {
//   res.status(500).json(err.message)
// })

// För att komma igång:

// 1. Kör ett POST-call mot http://localhost:3000/api/party med värden:
// {
//   "participants": [
//     {
//       "name": "Alice",
//       "foodChoice": ["Pizza"],
//       "attending": true,
//       "group": 1
//     },
//     {
//       "name": "Bobeeeee",
//       "foodChoice": ["Burger"],
//       "attending": true,
//       "group": 1
//     }
//   ]
// }

// 2. Kör ännu ett POST-call mot http://localhost:3000/api/party för att skapa ytterligare en till grupp:
// {
//   "participants": [
//     {
//       "name": "Hans",
//       "foodChoice": ["Thai"],
//       "attending": false,
//       "group": 2
//     },
//     {
//       "name": "Slobodan",
//       "foodChoice": ["Subway"],
//       "attending": false,
//       "group": 2
//     }
//   ]
// }

// 3. Kolla databasen med ett GET-anrop mot mot http://localhost:3000/api/party

// 4. Lek runt. Notera att end-pointen är unik när man ska deleta en specifik deltagare

//Hämta alla deltagare
app.get('/api/party', async (req, res) => {
  try {
    // Retrieve all RSVP documents from the database
    const PartyModels = await PartyModel.find({})

    // Send a response with the retrieved documents
    res.status(200).send({
      status: 'success',
      message: 'RSVPs retrieved successfully',
      data: PartyModels,
    })
  } catch (error) {
    // Send an error response if something went wrong
    res.status(500).send({
      status: 'error',
      message: error.message,
    })
  }
})

// Lägg till en eller flera deltagare
app.post('/api/party', async (req, res) => {
  try {
    // Create a new RSVP document from the request body
    const PartyModels = new PartyModel(req.body)

    // Save the document to the database
    await PartyModels.save()

    // Send a response indicating success
    res.status(200).send({
      status: 'success',
      message: 'RSVP created successfully',
      data: PartyModels,
    })
  } catch (error) {
    // Send an error response if something went wrong
    res.status(500).send({
      status: 'error',
      message: error.message,
    })
  }
})

//Ändra en specifik deltagare (Ej allergier)

// JSON-kodexempel som kan köras i Insomnia:
// {
//   "participants": [
//     {
//       "_id": "645cba2ffa2c32ea421edf56",
//       "attending": false
//     }
//   ]
// }

// "attending" är bara ett exempel. Går att ändra grupp, namn osv men inte foodchoices

app.put('/api/party', async (req, res) => {
  let participantId = req.body.participants[0]._id
  let participantName = req.body.participants[0].name
  let participantAttending = req.body.participants[0].attending
  let participantGroup = req.body.participants[0].group

  try {
    await PartyModel.updateOne(
      { 'participants._id': participantId },
      {
        $set: {
          'participants.$.name': participantName,
          'participants.$.attending': participantAttending,
          'participants.$.group': participantGroup,
        },
      },
    )
    const updatedParty = await PartyModel.find({
      'participants._id': participantId,
    })
    return res.status(200).json(updatedParty)
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
})

// Deleta en användare

// Strular lite för tillfället, ska åtgärda

// app.delete('/api/party-user', async (req, res) => {
//   const participantId = req.body.participants[0]._id
//   try {
//     const updatedParty = await PartyModel.deleteOne(
//       {},
//       { $pull: { participants: { _id: participantId } } },
//     )
//     return res.status(200).json(updatedParty)
//   } catch (error) {
//     return res.status(500).json({
//       error: error.message,
//     })
//   }
// })

// Deleta en hel grupp

// JSON-kodexempel som kan köras i Insomnia:
// {
//   "_id": "Skriv in ID för det specifika participants id'et"
// }
app.delete('/api/party', async (req, res) => {
  let partyId = req.body._id
  try {
    const deletedParty = await PartyModel.findByIdAndDelete(partyId)
    return res.status(200).json(deletedParty)
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
})
