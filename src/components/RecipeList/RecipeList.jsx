/* --------------------------------Imports--------------------------------*/

import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../App.jsx';

import RecipeCard from './RecipeCard/RecipeCard.jsx';
import SortBar from './SortBar/SortBar.jsx';

// css
import './RecipeList.css';

/* --------------------------------Function--------------------------------*/

function RecipeList() {

    const [loading, setLoading] = useState(true);
    const {user, recipes, setRecipes} = useContext(AuthContext);

    
    useEffect(() => {

      if (recipes.length > 0) {
        console.log('loaded');
        console.log(recipes);
        setLoading(false);
      } else {
        console.log('not loaded');
      }
  
    }, [recipes, user])

    return (
      <main id="recipe-list-main">
          
          <h2>Recipes List</h2>

          < SortBar />

          { loading ? (<div>Still loading...</div>) : (<section id="recipe-list-section">
          {recipes.map(recipe => {
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