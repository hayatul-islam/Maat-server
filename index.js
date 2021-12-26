const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 4040;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.r9gms.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("Maat");
        const teamsCollection = database.collection("teams");
        const expertiseCollection = database.collection("expertise");
        const blogsCollection = database.collection("blogs");

        // all teams 
        app.get('/teams', async (req, res) => {
            const teams = await teamsCollection.find({}).toArray();
            res.send(teams);

        });

        // all teams 
        app.get('/expertise', async (req, res) => {
            const expertise = await expertiseCollection.find({}).toArray();
            res.send(expertise);
        });

        // all blogs 
        app.get('/blogs', async (req, res) => {
            const blogs = await blogsCollection.find({}).toArray();
            res.send(blogs);
        });
    }

    finally {

    }
} run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})