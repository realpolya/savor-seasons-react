/* --------------------------------Imports--------------------------------*/

import axios from "axios";

/* --------------------------------Variables--------------------------------*/

const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

/* --------------------------------Helper Functions--------------------------------*/

/* --------------------------------Functions--------------------------------*/

const index = async (token) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/ingredients`, {
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

/* --------------------------------Exports--------------------------------*/

export { index };
