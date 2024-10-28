/* --------------------------------Imports--------------------------------*/

import { useState, useEffect, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

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

/* --------------------------------Variables--------------------------------*/

// AuthContext can be set to an object (if you want to pass down
// multiple items through the value prop)
// EXAMPLE: const contextObject = { user, setUser }
const AuthContext = createContext(null);

/* --------------------------------Function--------------------------------*/

function App() {

  // condition to view all recipes (or favorites, or my recipes, or sorted/filtered/etc)
  const [listCondition, setListCondition] = useState('all');

  const handleListCondition = condition => {
    setListCondition(condition);
  }

  const [user, setUser] = useState(null);
  const authObject = { user, setUser }

  return (
    <>
    
      <AuthContext.Provider value={authObject}>

        <h1>Savor the Seasons</h1>
        
        < NavBar user={user} /> 

        <Routes>
          {/* protected Routes */}
          <>
            <Route path="/about-team" element={< AboutTeam setUser={setUser} />} />
            <Route path="/recipe-form" element={< RecipeForm setUser={setUser}/>} />
            <Route path="/recipe-list" element={< RecipeList setUser={setUser} />} />
            <Route path="/recipe-page" element={< RecipePage setUser={setUser} /> } />
          </>
          {/* Public Routes */}
          { user ? (< Route path="/" element={<Dashboard user={user}/>} />) : (< Route path="/" element={<RecipeList />} />)}
          < Route path="/sign-up" element={< SignUpForm setUser={setUser}/>} />
          < Route path="/sign-in" element={< SignInForm setUser={setUser}/>} />
          
        </Routes>

        <Footer/>

      </AuthContext.Provider>
    </>
  )

}
/* --------------------------------Exports--------------------------------*/

export { AuthContext };
export default App;
