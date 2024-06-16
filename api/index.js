const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose")

require('dotenv').config();

const Transaction = require('./models/Transaction.js');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/transaction', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const {name,description,datetime,price} = req.body;
    const transaction = await Transaction.create({name,description,datetime,price})
    res.json(transaction);
  })

app.get('/api/transaction', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find({})
    res.json(transactions);
  })

const PORT = process.env.BACKEND_PORT || 4000

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})