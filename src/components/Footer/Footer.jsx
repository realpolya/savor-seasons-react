/* --------------------------------Imports--------------------------------*/
import { Link } from 'react-router-dom'
import { AuthContext } from '../../App'
import { useContext } from 'react'
// css
import './Footer.css';

/* --------------------------------Function--------------------------------*/

function Footer() {
  return (
    <footer id='footer'>
      <ul>
        <li>
          <Link to="/about-team"> about team </Link>
        </li>
      </ul>
    </footer>
  )
}

/* --------------------------------Exports--------------------------------*/

export default Footer;
