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

      } catch(err) {
        console.log(err)
      }
      
    }, [condition, recipes, userRecipes, favorites])

    return (
      <main id="recipe-list-main">
          {condition==="all"? ( <h2>Savour the Season Recipes</h2>): null}
          {condition==="my-recipes"? (<h2>My Recipe list</h2>): null}
          {condition==="favorites"? (<h2> My favorites</h2>): null}
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