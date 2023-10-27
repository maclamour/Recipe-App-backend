import dotenv from 'dotenv';
dotenv.config();


import express from 'express'
import cors from 'cors'
import * as recipeAPI from './recipeAPI'

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/recipe/search', async (req, res) => {
const searchTerm = req.query.searchTerm as string;
const page = parseInt(req.query.page as string);

const results = await recipeAPI.searchRecipes(searchTerm, page);
return res.json(results);
});

app.listen(5500, () => {
    console.log('Server running on localhost: 5500 ✅ ');
});