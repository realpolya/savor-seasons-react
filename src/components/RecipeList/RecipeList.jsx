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
    const [sorting, setSorting] = useState(true);
    const [listRecipes, setListRecipes]  = useState(null);
    const {user, recipes, userRecipes, favorites} = useContext(AuthContext);

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
      
    }, [condition, recipes, userRecipes, favorites, sorting])

    return (

      <main id="recipe-list-main">

          {condition==="all"? (
                <div id="div-recipes-list-heading">
                    <h2 id="main-title" className="recipe-list-h2">Savor the Seasons Recipes</h2>
                    <p>Welcome to a full-stack application built by engineers Paola Soria, Polina Stepanova, and Mandy Decamp. <span>Savor the Seasons</span> is a web platform where food enthusiasts
                         can exchange recipes and review each other's culinary endeavors. Enjoy! </p>
                </div>
            ): null}
          {condition==="my-recipes"? (<h2 className="recipe-list-h2">My Recipes</h2>): null}
          {condition==="favorites"? (<h2 className="recipe-list-h2"> My Favorites</h2>): null}

          < SortBar listRecipes={listRecipes} 
          setListRecipes={setListRecipes} 
          setSorting={setSorting}
          condition={condition}/>

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