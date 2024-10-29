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
      <li className="nav-bar-li">
        <Link to="/" className="nav-bar-link">Recipes</Link>
      </li>
      <li className="nav-bar-li"> 
        <Link to="/recipe-form" className="nav-bar-link">New Recipe</Link>
      </li>
      <li className="nav-bar-li">
        <Link to="/" onClick={handleSignOut} className="nav-bar-link">Sign out</Link>
      </li>
      <li className="nav-bar-li">
        <Link to="/about-team" className="nav-bar-link">About</Link>
      </li>
  </ul>

  const outNav = <ul id="nav-bar-ul">
      <li className="nav-bar-li">
        <Link to="/sign-up" className="nav-bar-link">Sign up</Link>
      </li>
      <li className="nav-bar-li">
        <Link to="/sign-in" className="nav-bar-link">Sign in</Link>
      </li>
      <li className="nav-bar-li">
        <Link to="/about-team" className="nav-bar-link">About</Link>
      </li>
  </ul>



  return (
    <nav id='nav-bar'>

      <div id='nav-bar-logo'>
        <h1 id="nav-bar-h1">Savor the Seasons</h1>
        <p id="nav-bar-p">seasonal recipes website</p>
      </div>

      {user ? userNav : outNav}
      
    </nav>
  )
}

/* --------------------------------Exports--------------------------------*/

export default NavBar