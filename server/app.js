const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 80;

// Middleware to parse json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Schema model
const recipeSchema = new mongoose.Schema({
    name: String,
    ingredients: [String],
    instructions: String
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// API route to add a new recipe
app.post('/api/recipes', async (req, res) => {
    const { name, ingredients, instructions } = req.body;
    const newRecipe = new Recipe({
        name,
        ingredients: ingredients.split(','),  // Split comma-separated ingredients into an array
        instructions
    });

    try {
        await newRecipe.save();  // Save recipe to MongoDB
        res.json({ message: 'Recipe added successfully!' });
    } catch (err) {
        res.status(500).send('Error adding recipe');
    }
});

// API route to get all recipes
app.get('/api/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();  // Fetch all recipes from MongoDB
        res.json(recipes);
    } catch (err) {
        res.status(500).send('Error fetching recipes');
    }
});

// Connect mongodb to backend
mongoose.connect('mongodb://localhost/recipemaster')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

// express stuff
app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }))

// Endpoints
app.get('/api/recipes', (req, res) => {
    const recipes =[{
        id: '123',
        name: 'Zeeshan',
    }, {
        id: '234',
        name: 'Hamid',
    }, {
        id: '345',
        name: 'Rafeh',
    }];

    res.json(recipes);
});

// Start the server
app.listen(port, () => {
    console.log(`Application succesfully started on port${port}`);
})