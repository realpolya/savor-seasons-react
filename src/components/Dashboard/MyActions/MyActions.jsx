/* --------------------------------Imports--------------------------------*/

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../App.jsx';

// css
import './MyActions.css';

/* --------------------------------Function--------------------------------*/

function MyActions() {

    const {user} = useContext(AuthContext);

    return (
      <section id="my-actions-section">
          <div id="my-actions-account-div">
            <h4>Your Account</h4>
            <p>Your username: </p>
            <p>Your email: </p>
          </div>
          <div id="my-actions-buttons-div">
            <Link className="my-actions-link"><button>New Recipe</button></Link>
            <Link className="my-actions-link"><button>Sign Out</button></Link>
          </div>
      </section>
    )

  }

/* --------------------------------Exports--------------------------------*/

export default MyActions;