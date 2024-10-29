/* --------------------------------Imports--------------------------------*/

import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../../App.jsx';

// css
import './MyFavoritesTable.css';

/* --------------------------------Function--------------------------------*/

function MyFavoritesTable() {

    // TODO: swap recipes with favorites
    const {user, recipes} = useContext(AuthContext);

    // TODO: define maximum number of favorites shown at once


    return (
      <section id="my-favorites-table-section">
          <h2 id="my-favorites-table-h2"><Link id="my-favorites-table-h2-link">Your Favorites</Link></h2>
          <ul id="my-favorites-table-ul">
            {recipes.map(recipe => {
              return <li key={recipe._id}><Link>{recipe.name} <span>by</span> {recipe.author.username}</Link></li>
            })}
          </ul>
      </section>
    )

  }

/* --------------------------------Exports--------------------------------*/

export default MyFavoritesTable;