const API_KEY = process.env.API_KEY;

const searchRecipes = (searchTerm: string, page:number) =>{
    if(!API_KEY){
        throw new Error('API key not found')
    }

    const url = new URL("https://api.spoonacular.com/recipes/complexSearch");

    const queryParams = {
        apiKey: API_KEY,
        query: searchTerm,
        number:10,
        offset: (page - 1) *10
    };

}