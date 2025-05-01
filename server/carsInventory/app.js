/*jshint esversion: 10 */

const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3050;

app.use(cors());
app.use(express.urlencoded({ extended: false }));

const carsData = JSON.parse(fs.readFileSync("car_records.json", 'utf8'));
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

app.get('/carsbymaxmileage/:id/:mileage', async (req, res) => {
    const mileage = req.params.mileage
    let miles = {}
    if(mileage <= 50000) {
        miles = { $lte: 50000 }
    } else if(mileage > 50000 || mileage <= 100000) {
        miles = { $gt: 50000, $lte: 100000 }
    } else if(mileage > 100000 || mileage <= 150000) {
        miles = { $gt: 100000, $lte: 150000 } 
    } else if(mileage > 150000 || mileage <= 200000) {
        miles = { $gt: 150000, $lte: 200000 } 
    } else if(mileage > 200000) {
        miles = { $gt: 200000 }
    }
    
    try {
        const documents = await Cars.find({dealer_id: req.params.id, mileage: miles});
        res.json(documents)
    } catch (e) {
        res.status(500).json({error: 'Error fetching cars by mileage'})
    }
});

app.get('/carsbyprice/:id/:price', async (req, res) => {
    const price = req.params.price
    const cost_query = {}
    if(price <= 20000) {
        cost_query = { $lte: 20000 }
    } else if(price > 20000 || price <= 40000) {
        cost_query = { $gt: 20000, $lte: 40000 }
    } else if(price > 40000 || price <= 60000) {
        cost_query = { $gt: 40000, $lte: 60000 } 
    } else if(price > 60000 || price <= 80000) {
        cost_query = { $gt: 60000, $lte: 80000 } 
    } else if(price > 80000) {
        cost_query = { $gt: 80000 }
    }
    
    try {
        const documents = await Cars.find({dealer_id: req.params.id, price: cost_query});
        res.json(documents)
    } catch (e) {
        res.status(500).json({error: 'Error fetching cars by mileage'})
    }
});

app.get('/carsbymake/:id/:year', async (req, res) => {
    try {
        const documents = await Cars.find({dealer_id: req.params.id, year: req.params.year})
        res.json(documents)
    } catch (e) {
        res.status(500).json({error: 'Error fetching cars by year'})
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });