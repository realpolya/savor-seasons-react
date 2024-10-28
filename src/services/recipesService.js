/* --------------------------------Imports--------------------------------*/

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
}


/* --------------------------------Exports--------------------------------*/

