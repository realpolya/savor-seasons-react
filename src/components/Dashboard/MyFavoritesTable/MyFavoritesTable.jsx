/* --------------------------------Imports--------------------------------*/

import {Link} from 'react-router-dom';
import {useContext, useState} from 'react';

import {AuthContext} from '../../../App.jsx';

// css
import './MyFavoritesTable.css';

/* --------------------------------Function--------------------------------*/

function MyFavoritesTable() {

  const { favorites } = useContext(AuthContext);
  
  // TODO: define maximum number of favorites shown at once
    return (
        <section id="my-favorites-table-section">
        <h2 id="my-favorites-table-h2">
          <Link id="my-favorites-table-h2-link">Your Favorites</Link>
        </h2>
          { !favorites || favorites.length === 0 ? (<p>No favorites yet.</p>) : (<ul id="my-favorites-table-ul">
                {favorites.map(recipe => (
                  <li key={recipe._id} className="favorite-item">
                    <Link to={`/recipes/${recipe._id}`}>
                      <img src={recipe.name} alt={recipe.name} className="favorite-item-img" />
                      <div>
                        <h3>{recipe.name}</h3>
                        <span>by</span> {recipe.author.username}
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>) }
        </section>
    )

}

/* --------------------------------Exports--------------------------------*/

export default MyFavoritesTable;
