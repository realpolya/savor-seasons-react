/* --------------------------------Imports--------------------------------*/
import axios from "axios";
/* --------------------------------Variables--------------------------------*/
const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

/* --------------------------------Helper Functions--------------------------------*/

/* --------------------------------Functions--------------------------------*/
/* --------------------------------GET Servies--------------------------------*/
export const getFavorites = async (token) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/favorites/${recipeId}`,
      {
        headers: {
          Authorization: `Bearer${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error removing from favorites:",
      error.response?.data || error.message
    );
    throw error;
  }
};
/* --------------------------------POST Service--------------------------------*/
export const addToFavorites = async (recipeId, token) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/favorites/${recipeId}`,
      {},
      {
        headers: {
          Authorization: `Bearer${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding to favorites:",
      error.response?.data || error.message
    );
    throw error;
  }
};
/* --------------------------------PUT Service--------------------------------*/
export const removeRecipeFromFavorites = async (recipeId, token) => {
  try {
    const response = await axios.delete(
      `${BACKEND_URL}/favorites/${recipeId}`,
      {
        headers: {
          Authorization: `Bearer${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error removing from favorites:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/* --------------------------------Exports--------------------------------*/

export {
  get,
  post,
  delete
};
