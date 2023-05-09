const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const PartyModel = require('../models')

const start = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/party')
  } catch (error) {
    console.error(error)
  }
}
start()

router.get('/api/party', async (req, res) => {
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
