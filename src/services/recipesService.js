
import axios from 'axios';


/* --------------------------------Variables--------------------------------*/

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

/* --------------------------------Helper Functions--------------------------------*/

/* --------------------------------Functions--------------------------------*/
//service to fetch all recipes
export const getAllRecipes = async () => {
    try{

        const response = await axios.get(`${BACKEND_URL}/recipes`);
        return response.data;

} catch(error) {

        console.error('Error fetching recipes:', error);
        throw error;

    }
};

// service to fetch a single recipe by id
export const singleRecipe = async (recipeId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/recipes/${recipeId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching the recipe:', error);
        throw error;
    }
};

// FIXME: user information is not properly being sent to the back end
// service to fetch a recipe by the logged-in user

export const getUserRecipes = async (token) => {
    
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
export const createRecipe = async (recipeData, token) => {
    try {
        console.log("calling backend");
        const response = await axios.post(
            `${BACKEND_URL}/recipes`,
            recipeData,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the Bearer token
                },
            }
        );
        console.log("response", response);
        return response.data;
    } catch (error) {
        console.error('Error creating recipe:', error);
        throw error;
    }
};

//service to update a recipe by id
export const updateRecipe = async(recipeId,  updatedData)=> {
    try {
        const response = await axios.put(`${BACKEND_URL}/recipes/${recipeId}/`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating recipe:', error);
        throw error;
    }
};

// service to delete a recipe by Id
export const deleteRecipe = async (recipeId) => {
    try{
        const response = await axios.delete(`${BACKEND_URL}/recipes/${recipeId}`);
        return response.data;
    }catch (error) {
     console.error('Error deleting recipe:', error);
     throw error;
    }
};

//service to add a review to a recipe
export const createReview = async(recipeId, reviewData ) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/recipes/${recipeId}/reviews`, reviewData);
        return response.data;
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
};

// service to update a review to a recipe
export const updateReview = async(recipeId, reviewId, updatedReview) => {
    try{
        const response= await axios.put(`${BACKEND_URL}/recipes/${recipeId}/reviews/${reviewId}`, updatedReview);
        return response.data;
    } catch(error){
        console.error('Error updating review:', error);
        throw error;
    }
};

// service to delete a review from a recipe
export const deleteReview = async(recipeId, reviewId)=> {
    try{
        const response= await axios(`${BACKEND_URL}/recipes/${recipeId}/reviews/${reviewId}`);
        return response.data;
    }catch(error){
        console.error('Error deleting review:', error);
        throw error;
    }
};
