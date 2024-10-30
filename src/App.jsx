/* --------------------------------Imports--------------------------------*/

import { useState, useEffect, createContext } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'

// css
import './App.css'

// services
import services from "./services/index.js";

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

/* --------------------------------Variables--------------------------------*/

const AuthContext = createContext(null);

/* --------------------------------Function--------------------------------*/

function App() {

  /* LOCATION */
  const location = useLocation();
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  /* STATES */
  // condition to view all recipes (or favorites, or my recipes, or sorted/filtered/etc)
  const [user, setUser] = useState(services.getUser());
  // const [favorites, setFavorites] = useState(null);

  // all recipes are a constant, recipes can get sorted / filtered
  const [allRecipes, setAllRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  // const [toggle, setToggle] = useState(true); // tbd

  /* FUNCTIONS */
  const fetchAllRecipes = async () => {
    const recipesData = await services.getAllRecipes();
    setAllRecipes(recipesData);
    setRecipes(recipesData);
  };

  const fetchUserFavorites = async () => {
    const userFavorites = await services.getFavorites(token)
    setFavorites(userFavorites.recipes);
  }

  const fetchUserRecipes = async () => {
    const userRecipesData = await services.getUserRecipes(token);
    setUserRecipes(userRecipesData)
  }

  const handleUpdateRecipe = async (recipeId, recipeFormData) => {

    const updatedRecipe = await services.updateRecipe(recipeId, recipeFormData);
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
            <Route path="/about-team" element={< AboutTeam />} />

            <Route path="/recipe-form" element={< RecipeForm />} />
            <Route path="/recipes/:recipeId/edit" element={<RecipeForm handleUpdateRecipe={ handleUpdateRecipe} />} />
            {/* route for viewing favorites */}
            {/* route for viewing my recipes */}
            <Route path="/recipes/:recipeId" element={<RecipePage /> } />
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
