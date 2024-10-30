/* --------------------------------Imports--------------------------------*/

import { useState, useEffect, createContext } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'

// css
import './App.css'

// services
import * as authService from "./services/authService.js";

// example
// import services from './index.js'

// component imports below
import NavBar from './components/NavBar/NavBar.jsx';
import RecipeList from './components/RecipeList/RecipeList.jsx';
import RecipeForm from './components/RecipeForm/RecipeForm.jsx';
import RecipePage from './components/RecipePage/RecipePage.jsx';
import SignInForm from './components/SignInForm/SignInForm.jsx';
import SignUpForm from './components/SignUpForm/SignUpForm.jsx';
import AboutTeam from './components/AboutTeam/AboutTeam.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Footer from './components/Footer/Footer.jsx';

// delete later
import {dummyRecipes} from './dummy-data/dummy-data.js';
import * as recipesService from "./services/recipesService.js";
import * as favoritesService from "./services/favoritesService.js";

/* --------------------------------Variables--------------------------------*/

// AuthContext can be set to an object (if you want to pass down
// multiple items through the value prop)
// EXAMPLE: const contextObject = { user, setUser }

const AuthContext = createContext(null);

/* --------------------------------Function--------------------------------*/

function App() {

  /* LOCATION */
  const location = useLocation();
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  /* STATES */
  // condition to view all recipes (or favorites, or my recipes, or sorted/filtered/etc)
  // const [listCondition, setListCondition] = useState('all');
  const [user, setUser] = useState(authService.getUser());
  // const [favorites, setFavorites] = useState(null);

  // all recipes are a constant, recipes can get sorted / filtered
  const [allRecipes, setAllRecipes] = useState(dummyRecipes);
  const [recipes, setRecipes] = useState(dummyRecipes);
  const [userRecipes, setUserRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  // const [ingredients, setIngredients] = useState([]);
  // const [toggle, setToggle] = useState(true); // tbd

  /* FUNCTIONS */
  const fetchAllRecipes = async () => {
    const recipesData = await recipesService.getAllRecipes();
    setRecipes(recipesData);
  };

  const fetchUserFavorites = async () => {
    const userFavorites = await favoritesService.getFavorites(token)
    setFavorites(userFavorites.recipes);
  }

  // const fetchAllIngredients = async () => {
  //   const ingredientsData = await ingredientsService.getAllIngredients();
  //   setIngredients(ingredientsData);
  // };

  const fetchUserRecipes = async () => {
    const userRecipesData = await recipesService.getUserRecipes(token);
    setUserRecipes(userRecipesData)
  }

  // const handleListCondition = condition => {
  //   setListCondition(condition);
  // }

  const handleUpdateRecipe = async (recipeId, recipeFormData) => {
    const updatedRecipe = await recipesService.update(recipeId, recipeFormData);

    setRecipes(recipes.map((recipe) => (recipeId === recipe._id ? updatedRecipe : recipe)));

    navigate(`recipes/${recipeId}`);
  };

  /* USE EFFECT */
  useEffect(() => {

    fetchAllRecipes();
    if (user) {
      fetchUserRecipes();
      fetchUserFavorites()
    }
  
  }, [location.pathname]);

  /* USE CONTEXT */
  const contextObject = { user, setUser, allRecipes, recipes, setRecipes, userRecipes, favorites };

  /* RETURN */
  return (
    <>
    
      <AuthContext.Provider value={contextObject}>
        
        < NavBar user={user} /> 

        <Routes>

          {/* protected Routes */}
          <>
            < Route path="/home" element={< Dashboard />} />
            <Route path="/about-team" element={< AboutTeam setUser={setUser} />} />

            <Route path="/recipe-form" element={< RecipeForm setUser={setUser}/>} />
            <Route path="/recipes/:recipeId/edit" element={<RecipeForm handleUpdateRecipe={ handleUpdateRecipe} />} />
            {/* route for viewing favorites */}
            {/* route for viewing my recipes */}
            <Route path="/recipes/:recipeId" element={<RecipePage setUser={setUser} /> } />
          </>

          {/* Public Routes */}
          < Route path="/" element={< RecipeList />} />
          < Route path="/sign-up" element={< SignUpForm />} />
          < Route path="/sign-in" element={< SignInForm />} />
          
        </Routes>

        <Footer/>

      </AuthContext.Provider>
    </>
  )

}
/* --------------------------------Exports--------------------------------*/

export { AuthContext };
export default App;
