
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sioj4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()
app.use(bodyParser.json());
app.use(cors());



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const treesCollection = client.db("greenCity").collection("trees");
    const servicesCollection = client.db("greenCity").collection("services");


    // Add services
    app.post('/addServices', (req, res) => {
        const services = req.body;
        console.log(services);
        servicesCollection.insertOne(services)
            .then(results => {
                res.send(results.insertedCount > 0)

                console.log("🚀 ~ file: index.js ~ line 29 ~ app.post ~ results", results)
            })
    })

    // Read services data
    app.get('/services', (req, res) => {
        servicesCollection.find({})
            .toArray((err, services) => {
                res.send(services)
                console.log(err);
            })
    })


});



app.get('/', function (req, res) {
    res.send('Welcome to Green City server')
})
app.listen(process.env.PORT || 5000);
