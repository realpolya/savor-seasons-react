/* --------------------------------Imports--------------------------------*/
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App.jsx';

import RecipeCard from './RecipeCard/RecipeCard.jsx';
import SortBar from './SortBar/SortBar.jsx';

// css
import './RecipeList.css';

/* --------------------------------Function--------------------------------*/

function RecipeList({ recipes }) {

    // const {user} = useContext(AuthContext);

    return (
      <main id="recipe-list-main">
          
          <h1>Recipe List</h1>
          < SortBar />
          <section id="recipe-list-section">
            {recipes.map(recipe => {
              return <Link to={`/recipes/${recipe._id}`}>
              < RecipeCard recipe={recipe}/>
              </Link>
            })}
          </section>
          
      </main>
    )

  }

/* --------------------------------Exports--------------------------------*/

export default RecipeList;