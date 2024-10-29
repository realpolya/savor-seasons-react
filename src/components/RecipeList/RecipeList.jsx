/* --------------------------------Imports--------------------------------*/
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../App.jsx';

import RecipeCard from './RecipeCard/RecipeCard.jsx';
import SortBar from './SortBar/SortBar.jsx';

// css
import './RecipeList.css';

/* --------------------------------Function--------------------------------*/

// TODO: pass the listCondition prop to know which list to render (landing page, favorites, my recipes)

function RecipeList() {

    const {user, recipes, setRecipes} = useContext(AuthContext);

    return (
      <main id="recipe-list-main">
          
          <h2>Recipes List</h2>

          < SortBar />

          <section id="recipe-list-section">
            {recipes.map(recipe => {
              return <Link to={`/recipes/${recipe._id}`} key={recipe._id} className="recipe-card-link">
                < RecipeCard recipe={recipe}/>
              </Link>
            })}
          </section>
          
      </main>
    )

  }

/* --------------------------------Exports--------------------------------*/

export default RecipeList;