/* --------------------------------Imports--------------------------------*/

import { Link } from 'react-router-dom'

// css
import './Footer.css';

/* --------------------------------Function--------------------------------*/

function Footer() {
  return (
    <footer id='footer'>
      <p id="footer-p">&copy; { new Date().getFullYear() } Savor the Seasons.</p>
      <Link to="/about-team" id="footer-link">Team</Link>
    </footer>
  )
}

/* --------------------------------Exports--------------------------------*/

export default Footer;
