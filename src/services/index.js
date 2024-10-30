import * as auth from './sub-services/authService';
import * as favorites from './sub-services/favoritesService';
import * as ingredients from './sub-services/ingredientsService';
import * as recipes from './sub-services/recipesService';
import * as sort from './sub-services/sortService';

const {
  signUp,
  signIn,
  getUser,
  signOut
} = auth;

const {
    getFavorites,
    createFavorite,
    removeFavorite
} = favorites;

const {
    getAllIngredients
} = ingredients;

const { getAllRecipes, 
    getSingleRecipe, 
    getUserRecipes, 
    createRecipe,
    updateRecipe, 
    deleteRecipe, 
    createReview, 
    updateReview, 
    deleteReview
} = recipes;

const { sortRecipes, 
    searchRecipes 
} = sort;

const services = {
    signUp,
    signIn,
    getUser,
    signOut,
    getFavorites,
    createFavorite,
    removeFavorite,
    getAllIngredients,
    getAllRecipes, 
    getSingleRecipe, 
    getUserRecipes, 
    createRecipe,
    updateRecipe, 
    deleteRecipe, 
    createReview, 
    updateReview, 
    deleteReview,
    sortRecipes, 
    searchRecipes
}

export {
    services as default,
    signUp,
    signIn,
    getUser,
    signOut,
    getFavorites,
    createFavorite,
    removeFavorite,
    getAllIngredients,
    getAllRecipes, 
    getSingleRecipe, 
    getUserRecipes, 
    createRecipe,
    updateRecipe, 
    deleteRecipe, 
    createReview, 
    updateReview, 
    deleteReview,
    sortRecipes, 
    searchRecipes
}