const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const PartyModel = require('./models')

const start = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/party')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
start()

app.get('/api/party', async (req, res) => {
  try {
    const party = await PartyModel.find()
    console.log('HEJ ', party)
    return res.status(200).json(party)
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
})

app.post('/api/party', async (req, res) => {
  const group = req.body?.group
  console.log('HEJ: ', group)
  try {
    const newGroup = new PartyModel({ group })
    const insertedGroup = await newGroup.save()
    return res.status(201).json(insertedGroup)
    // const party = await PartyModel.find()
    // return res.status(200).json(party)
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

const port = 3000

// Routes
const product = require('./routes/product')
app.use(product)

const category = require('./routes/category')
app.use(category)

const productList = require('./routes/product-list')
app.use(productList)

const productListGuest = require('./routes/product-list-guest')
app.use(productListGuest)

const userProductList = require('./routes/user-product-list')
app.use(userProductList)

const guest = require('./routes/guest')
app.use(guest)

const user = require('./routes/user')
app.use(user)

// app.use(express.static('public'))

app.use(function (err, req, res) {
  res.status(500).json(err.message)
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
