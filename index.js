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
        const storyCollection = database.collection("story");
        const figuresCollection = database.collection("figures");
        const officesCollection = database.collection("offices");

        // add team
        app.post('/addTeam', async (req, res) => {
            const addTeam = await teamsCollection.insertOne(req.body);
            res.send(addTeam)
        });

        // all teams 
        app.get('/teams', async (req, res) => {
            const teams = await teamsCollection.find({}).toArray();
            res.send(teams);

        });

        // add expertise
        app.post('/addExpertise', async (req, res) => {
            const addExpertise = await expertiseCollection.insertOne(req.body);
            res.send(addExpertise)
        });

        // all expertise 
        app.get('/expertise', async (req, res) => {
            const expertise = await expertiseCollection.find({}).toArray();
            res.send(expertise);
        });

        // add blog
        app.post('/addBlog', async (req, res) => {
            const addBlog = await blogsCollection.insertOne(req.body);
            res.send(addBlog)
        });

        // all blogs 
        app.get('/blogs', async (req, res) => {
            const blogs = await blogsCollection.find({}).toArray();
            res.send(blogs);
        });

        // add story
        app.post('/addStory', async (req, res) => {
            const addStory = await storyCollection.insertOne(req.body);
            res.send(addStory)
        });

        // all story 
        app.get('/story', async (req, res) => {
            const story = await storyCollection.find({}).toArray();
            res.send(story);
        });

        // add figures
        app.post('/addFigures', async (req, res) => {
            const addFigures = await figuresCollection.insertOne(req.body);
            res.send(addFigures)
        });

        // all figures 
        app.get('/figures', async (req, res) => {
            const figures = await figuresCollection.find({}).toArray();
            res.send(figures);
        });

        // add office
        app.post('/addOffice', async (req, res) => {
            const addOffice = await officesCollection.insertOne(req.body);
            res.send(addOffice)
        });

        // all offices 
        app.get('/offices', async (req, res) => {
            const offices = await officesCollection.find({}).toArray();
            res.send(offices);
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