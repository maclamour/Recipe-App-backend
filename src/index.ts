import dotenv from 'dotenv';
dotenv.config();


import express from 'express'
import cors from 'cors'
import * as recipeAPI from './recipeAPI'
import {PrismaClient } from "@prisma/client"


const app = express();

const prismaClient = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get('/api/recipes/search', async (req, res) => {
const searchTerm = req.query.searchTerm as string;
const page = parseInt(req.query.page as string);

const results = await recipeAPI.searchRecipes(searchTerm, page);
return res.json(results);
});

app.get('/api/recipes/:recipeId/summary',async (req, res ) => {
    const recipeId = req.params.recipeId;
    const results = await recipeAPI.getRecipeSummary(recipeId);
    return res.json(results);
    
});

app.post('/api/recipes/favorite', async (req, res) => {
    const { recipeId } = req.body;
    try {
        const favoriteRecipe = await prismaClient.favoriteRecipe.create({
            data: { recipeId },
        });
        res.status(201).json(favoriteRecipe);    
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong.' })    
    }
});


app.listen(5500, () => {
    console.log('Server running on localhost: 5500 ✅ ');
});