const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
// const connection = require('./connection')

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

app.use(function (err, req, res, next) {
  res.status(500).json(err.message)
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
