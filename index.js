const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const fileUpload = require("express-fileupload");

const app = express();
const port = process.env.PORT || 4040;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

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

            const title = req.body.title;
            const category = req.body.category;
            const sub_tittle = req.body.sub_title;
            const publish = req.body.publish;
            const description = req.body.description;
            const sub_description = req.body.sub_description;
            const blogImage = req.files.image;

            const picImg = blogImage.data;
            const mainImg = picImg.toString("base64");
            const image = Buffer.from(mainImg, "base64");

            const blog = {
                title,
                category,
                sub_tittle,
                publish,
                description,
                sub_description,
                image
            };
            const result = await blogsCollection.insertOne(blog);
            res.json(result);
        });

        // all blogs 
        app.get('/blogs', async (req, res) => {
            const blogs = await blogsCollection.find({}).toArray();
            res.send(blogs);
        });

        // add story
        app.post('/addStory', async (req, res) => {

            const title = req.body.title;
            const category = req.body.category;
            const sub_tittle = req.body.sub_title;
            const description = req.body.description;
            const year = req.body.year;
            const storyImage = req.files.image;

            const picImg = storyImage.data;
            const mainImg = picImg.toString("base64");
            const image = Buffer.from(mainImg, "base64");

            const blog = {
                title,
                category,
                sub_tittle,
                description,
                year,
                image
            };
            const result = await blogsCollection.insertOne(blog);
            res.json(result);
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