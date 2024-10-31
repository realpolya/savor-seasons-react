import * as auth from './sub-services/authService';
import { addRecipeToFavorites, removeRecipeFromFavorites, getFavorites} from './sub-services/favoritesService';
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

const services = { // we never re declare constants Re
    signIn,
    getUser,
    signOut,
    getFavorites,
    createFavorite: addRecipeToFavorites,
    removeFavorite: removeRecipeFromFavorites,
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
    getFavorites,
    addRecipeToFavorites,
    removeRecipeFromFavorites
}