/* --------------------------------Imports--------------------------------*/

import {Link} from 'react-router-dom';
import {useContext, useState} from 'react';

import {AuthContext} from '../../../App.jsx';

// css
import './MyFavoritesTable.css';

/* --------------------------------Function--------------------------------*/

function MyFavoritesTable() {

  const { favorites } = useContext(AuthContext);
  
  return (
    <section id="my-favorites-table-section">

      <h2 id="my-favorites-table-h2">
        <Link to="/favorites" id="my-favorites-table-h2-link">Your Favorites</Link>
      </h2>

      { !favorites || favorites.length === 0 ? (<p>No favorites yet.</p>) : (<ul id="my-favorites-table-ul">
              {favorites.map(recipe => (
                <li key={recipe._id} className="favorite-item">

                  <Link to={`/recipes/${recipe._id}`} className="favorite-item-link">
                    <img src={recipe.image} alt={recipe.name} className="favorite-item-img" />
                    <div className="favorite-item-div">
                      <h3 className="favorite-item-h3">{recipe.name}</h3>
                      <p className="favorite-item-p"><span>by</span> {recipe.author.username}</p>
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
