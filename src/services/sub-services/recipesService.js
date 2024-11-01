
/* --------------------------------Imports--------------------------------*/

import axios from 'axios';

/* --------------------------------Variables--------------------------------*/

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

/* --------------------------------Functions--------------------------------*/

//service to fetch all recipes
const getAllRecipes = async () => {
    try{

        const response = await axios.get(`${BACKEND_URL}/recipes`);
        return response.data;

    } catch(error) {

        console.error('Error fetching recipes:', error);
        throw error;

    }
};

// service to fetch a single recipe by id
const getSingleRecipe = async (recipeId, token) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/recipes/recipe/${recipeId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching the recipe:', error);
        throw error;
    }
};

// service to fetch a recipe by the logged-in user
const getUserRecipes = async (token) => {

    try{
        const response = await axios.get(`${BACKEND_URL}/recipes//my-recipes`, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the Bearer token
            },
        });
        return response.data;

    }catch (error) {
        console.error('Error fetching user recipes:', error);
        throw error;
    }
};


//service to create a new recipe
const createRecipe = async (recipeData, token) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/recipes`,
            recipeData,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the Bearer token
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating recipe:', error);
        throw error;
    }
};

//service to update a recipe by id
const updateRecipe = async(recipeId,  updatedData, token)=> {
    try {
        const response = await axios.put(`${BACKEND_URL}/recipes/${recipeId}/`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating recipe:', error);
        throw error;
    }
};

// service to delete a recipe by Id
const deleteRecipe = async (recipeId, token) => {
    try{
        const response = await axios.delete(`${BACKEND_URL}/recipes/recipe/${recipeId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    }catch (error) {
        console.error('Error deleting recipe:', error);
        throw error;
    }
};

//service to add a review to a recipe
const createReview = async(recipeId, reviewData ) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/recipes/${recipeId}/reviews`, reviewData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
};

// service to update a review to a recipe
const updateReview = async(recipeId, reviewId, updatedReview) => {
    try{
        const response = await axios.put(`${BACKEND_URL}/recipes/${recipeId}/reviews/${reviewId}`, updatedReview, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data;
    } catch(error){
        console.error('Error updating review:', error);
        throw error;
    }
};

// service to delete a review from a recipe
const deleteReview = async(recipeId, reviewId)=> {
    try{
        const response = await axios.delete(`${BACKEND_URL}/recipes/${recipeId}/reviews/${reviewId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data;
    }catch(error){
        console.error('Error deleting review:', error);
        throw error;
    }
};

/* --------------------------------Exports--------------------------------*/

export { getAllRecipes,
    getSingleRecipe,
    getUserRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    createReview,
    updateReview,
    deleteReview };
