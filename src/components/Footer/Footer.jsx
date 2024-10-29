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
      <p id="footer-p">&copy; { new Date().getFullYear() } Savor the Seasons. All rights reserved.</p>
    </footer>
  )
}

/* --------------------------------Exports--------------------------------*/

export default Footer;
