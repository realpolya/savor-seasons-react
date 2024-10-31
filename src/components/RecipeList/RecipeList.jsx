/* --------------------------------Imports--------------------------------*/

import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../App.jsx';

import RecipeCard from './RecipeCard/RecipeCard.jsx';
import SortBar from './SortBar/SortBar.jsx';

// css
import './RecipeList.css';

/* --------------------------------Function--------------------------------*/

function RecipeList({ condition }) {

    const [loading, setLoading] = useState(true);
    const [listRecipes, setListRecipes]  = useState(null);
    const {user, recipes, userRecipes, favorites, setRecipes} = useContext(AuthContext);
    
    useEffect(() => {
      try {

        if (condition === "all" && recipes.length > 0) {
          setListRecipes(recipes);
          setLoading(false);
        } else if (condition === "my-recipes" && user && userRecipes.length > 0) {
          setListRecipes(userRecipes);
          setLoading(false);
        } else if (condition === "favorites" && user && favorites.length > 0) {
          setListRecipes(favorites);
          setLoading(false);
        }

        // if (recipes.length > 0) {
        //   console.log('loaded');
        //   console.log(recipes);
        //   setLoading(false);
        // } else {
        //   console.log('not loaded');
        // }

      } catch(err) {
        console.log(err)
      }
      
    }, [condition, recipes, userRecipes, favorites])

    return (
      <main id="recipe-list-main">
          
          <h2>Recipes List</h2>

          < SortBar />

          { loading ? (<div>Recipes not there yet...</div>) : (<section id="recipe-list-section">
          {listRecipes.map(recipe => {
          return <Link to={`/recipes/${recipe._id}`} key={recipe._id} className="recipe-card-link">
            < RecipeCard recipe={recipe}/>
          </Link>
          })}
        </section>) }
          
      </main>
    )

  }

/* --------------------------------Exports--------------------------------*/

export default RecipeList;