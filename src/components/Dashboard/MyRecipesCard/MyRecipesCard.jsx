/* --------------------------------Imports--------------------------------*/
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../../App.jsx';

// css
import './MyRecipesCard.css';

/* --------------------------------Function--------------------------------*/

function MyRecipesCard() {

    const {user, recipes, setRecipes} = useContext(AuthContext);

    // const myRecipes = recipes.filter(recipe => JSON.stringify(recipe.author._id) === JSON.stringify(user._id) )

    return (
      <section id="my-recipes-card-section">
        
          <h2>My Recipes</h2>

          <div id="my-recipes-card-div">

          </div>

      </section>
    )

  }

/* --------------------------------Exports--------------------------------*/

export default MyRecipesCard;