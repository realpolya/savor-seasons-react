// import {getAllRecipes} from "./src/services/recipesService.js";
import {getAllRecipes} from "./src/services/";

const runTests= async ()=> {
    console.log("Running tests");
    //test get all recipes
    const recipes = await getAllRecipes();
    console.log('All recipes:', recipes);
}
