/*jshint esversion: 10 */
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3050;

app.use(cors());
app.use(require('body-parser').urlencoded({ extended: false }));

const car_records_data = JSON.parse(fs.readFileSync("car_records.json", 'utf8'));
mongoose.connect("mongodb://mongo_db:27017/",{'dbName':'dealershipsDB'});

const Cars = require('./inventory');

try {
    Cars.deleteMany({}).then(() => {
        Cars.insertMany(carsData.cars);
    })
} catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Error fetching documents' });
}

app.get('/', async (req, res) => {
    res.send("Welcome to the Mongoose API");
});

app.get('/cars/:id', async (req, res) => {
    try {
        const documents = await Cars.find({dealer_id: req.params.id});
        res.json(documents);
    } catch (e) {
        res.status(500).json({error: 'Error fetching reviews'});
    }
});

app.get('/carsbymake/:id/:make', async (req, res) => {
    try {
        const documents = await Cars.find({dealer_id: req.params.id, make: req.params.make});
        res.json(documents);
    } catch (e) {
        res.status(500).json({error: 'Error fetching reviews by car make and model'});
    }
});

app.get('/carsbymake/:id/:model', async (req, res) => {
    try {
        const documents = await Cars.find({dealer_id: req.params.id, model: req.params.model});
        res.json(documents)
    } catch (e) {
        res.status(500).json({error: 'Error fetching reviews by ID'});
    }
});

