/* --------------------------------Imports--------------------------------*/
import axios from "axios";
import { Router } from "react-router-dom";
import Favorites from "../models/model-favorite.js";
/* --------------------------------Variables--------------------------------*/
const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

/* --------------------------------Helper Functions--------------------------------*/

/* --------------------------------Functions--------------------------------*/
Router.get("/", async (req, res) => {
  const { userId } = req.params;

  try {
    const getFavorites = await getFavorites.find({ userId });

    return res.staus(200).json({
      message: "Favorits loaded Successfully",
      favorites: getFavorites,
    });
  } catch (error) {
    return res.staus(500).json({
      message: "ERROR TRY AGIAN",
      error: error.message,
    });
  }
});

Router.post("/:recipeId", async (req, res) => {
  const { userId, recipeId } = req.params;

  try {
    const addToFavorites = await addToFavorites.create({
      userId,
      recipeId,
    });
    return res.staus(200).json({
      message: "Recipe add Successfully",
      favorites: addToFavorites,
    });
  } catch (error) {
    return res.staus(500).json({
      message: "ERROR TRY AGIAN",
      error: error.message,
    });
  }
});

Router.put(() => {});
/* --------------------------------Exports--------------------------------*/

export { get, post };
