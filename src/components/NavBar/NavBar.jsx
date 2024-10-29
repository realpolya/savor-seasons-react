/* --------------------------------Imports--------------------------------*/
import { Link } from 'react-router-dom'
import './NavBar.css'
import { AuthContext } from '../../App'
import { useContext } from 'react'
/* --------------------------------Function--------------------------------*/

function NavBar() {
  return (
    <nav id='nav-bar'>
      <ul>
        <li>
          <Link to="/">DashBoard</Link>
          <Link to="//sign-up">sign up</Link>
          <Link to="/sign-in">sign in</Link>
          <Link to="/about-team"> about team</Link>
          
        </li>
      </ul>
    </nav>
  )
}

/* --------------------------------Exports--------------------------------*/

export default NavBar