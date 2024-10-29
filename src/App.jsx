/* --------------------------------Imports--------------------------------*/

import { useState, useEffect, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'

// css
import './App.css'

// services
import * as authService from "./services/authService.js";
import * as favoritesService from "./services/favoritesService.js";
import * as ingredientsService from "./services/ingredientsService.js";
import * as recipesService from "./services/recipesService.js";

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

// AuthContext can be set to an object (if you want to pass down
// multiple items through the value prop)
// EXAMPLE: const contextObject = { user, setUser }

const AuthContext = createContext(null);

/* --------------------------------Function--------------------------------*/

function App() {

  /* STATES */

  // condition to view all recipes (or favorites, or my recipes, or sorted/filtered/etc)
  const [listCondition, setListCondition] = useState('all');
  const [user, setUser] = useState(true); // FIXME: change to null
  const [favorites, setFavorites] = useState(null);
  const [recipes, setRecipes] = useState(dummyRecipes);
  const [ingredients, setIngredients] = useState([]);
  const [toggle, setToggle] = useState(true);

  /* FUNCTIONS */
  const fetchAllRecipes = async () => {
    const recipesData = await recipesService.index();
    setRecipes(prev => [...prev, recipesData]);
  };

  const fetchAllIngredients = async () => {
    const ingredientsData = await ingredientsService.index();
    setIngredients(prev => [...prev, ingredientsData]);
  };

  const handleListCondition = condition => {
    setListCondition(condition);
  }

  /* USE EFFECT */
  // useEffect(() => {
  //   fetchAllRecipes();
  // }, [recipes]);

  /* USE CONTEXT */
  const contextObject = { user, setUser, recipes, setRecipes };

  /* RETURN */
  return (
    <>
    
      <AuthContext.Provider value={contextObject}>

        <h1>Savor the Seasons</h1>
        
        < NavBar user={user} /> 

        <Routes>

          {/* protected Routes */}
          <>
            <Route path="/about-team" element={< AboutTeam setUser={setUser} />} />
            <Route path="/recipe-form" element={< RecipeForm setUser={setUser}/>} />
            <Route path="/recipe-page" element={<RecipePage setUser={setUser} /> } />
          </>

          {/* Public Routes */}

          { user ? (< Route path="/" element={< Dashboard />} />) : (< Route path="/" element={< RecipeList />} />)}
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
