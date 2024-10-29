/* --------------------------------Imports--------------------------------*/

import axios from "axios";

/* --------------------------------Variables--------------------------------*/

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

/* --------------------------------Helper Functions--------------------------------*/

/* --------------------------------Functions--------------------------------*/

const getAllIngredients = async (token) => {

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

export { getAllIngredients };
