/* --------------------------------Imports--------------------------------*/
import { Link } from 'react-router-dom'
import { AuthContext } from '../../App'
import { useContext } from 'react'

import { signOut } from '../../services/authService.js'

import './NavBar.css'
/* --------------------------------Function--------------------------------*/

function NavBar() {

  const {user, setUser} = useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
    setUser(null);
  }

  const userNav = <ul id="nav-bar-ul">
      <li>
        <Link to="/">Recipes</Link>
      </li>
      <li>
        <Link to="/recipe-form">New Recipe</Link>
      </li>
      <li>
        <Link to="/" onClick={handleSignOut}>Sign out</Link>
      </li>
      <li>
        <Link to="/about-team">About</Link>
      </li>
  </ul>

  const outNav = <ul id="nav-bar-ul">
      <li>
        <Link to="/sign-up">Sign up</Link>
      </li>
      <li>
        <Link to="/sign-in">Sign in</Link>
      </li>
      <li>
        <Link to="/about-team">About</Link>
      </li>
  </ul>

  return (
    <nav id='nav-bar'>

      <h1 id="nav-bar-h1">Savor the Seasons</h1>

      {user ? userNav : outNav}
      
    </nav>
  )
}

/* --------------------------------Exports--------------------------------*/

export default NavBar