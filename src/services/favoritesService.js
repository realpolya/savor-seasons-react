/* --------------------------------Imports--------------------------------*/
import axios from "axios";
/* --------------------------------Variables--------------------------------*/
const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

/* --------------------------------Helper Functions--------------------------------*/
/* --------------------------------Functions--------------------------------*/
/* --------------------------------GET Services--------------------------------*/
export const getFavorites = async (token) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error retrieving favorites",
      error.response?.data || error.message
    );
    throw error;
  }
};

/* --------------------------------POST Services--------------------------------*/

export const createFavorite = async (recipeId, token) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/favorites/${recipeId}`, {
      headers: {
        Authorization: `Bearer${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error adding to favorites:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/* --------------------------------PUT Services--------------------------------*/

export const removeFavorite = async (recipeId, token) => {
  try {
    const response = await axios.put(`${BACKEND_URL}/favorites/${recipeId}`, {
      headers: {
        Authorization: `Bearer${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error removing from favorites:",
      error.response?.data || error.message
    );
    throw error;
  }
};


