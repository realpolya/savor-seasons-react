/* --------------------------------Imports--------------------------------*/

import { useState, useEffect, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

// component imports below
import NavBar from './components/NavBar/NavBar.jsx';

/* --------------------------------Variables--------------------------------*/

// AuthContext can be set to an object (if you want to pass down
// multiple items through the value prop)
// EXAMPLE: const contextObject = { user, setUser }
const AuthContext = createContext(null);

/* --------------------------------Function--------------------------------*/

function App() {

  const [user, setUser] = useState(null);

  const authObject = { user, setUser }

  return (
    <>
      <AuthContext.Provider value={authObject}>
        
        < NavBar handleSignOut={handleSignOut} />

        <h1>Savor the Seasons</h1>

        <Routes>

          { user ? (< Route path="/" element={<Dashboard/>} />) : (< Route path="/" element={<Landing />} />)}
          < Route path="/sign-up" element={< SignupForm setUser={setUser}/>} />
          < Route path="/sign-in" element={< SigninForm setUser={setUser}/>} />
          
        </Routes>

        < Footer />

      </AuthContext.Provider>
    </>
  )

}
/* --------------------------------Exports--------------------------------*/

export { AuthContext };
export default App;
