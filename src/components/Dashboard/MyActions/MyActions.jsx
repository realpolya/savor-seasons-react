/* --------------------------------Imports--------------------------------*/

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../App.jsx';

import { signOut } from '../../../services/index.js';

// css
import './MyActions.css';

/* --------------------------------Function--------------------------------*/

function MyActions() {

    const {user, setUser} = useContext(AuthContext);

    console.log(user);

    const handleSignOut = () => {
      signOut();
      setUser(null);
    }

    return (
      <section id="my-actions-section">
          <div id="my-actions-account-div">
            <h4>Your Account</h4>
            <p>Your username: <span className="my-actions-span">{user.username}</span></p>
            <p>Your email: <span className="my-actions-span">{user.email}</span></p>
          </div>
          <div id="my-actions-buttons-div">
            <Link to='/recipe-form' className="my-actions-link"><button>New Recipe</button></Link>
            <Link to="/" onClick={handleSignOut} className="my-actions-link"><button>Sign Out</button></Link>
          </div>
      </section>
    )

  }

/* --------------------------------Exports--------------------------------*/

export default MyActions;