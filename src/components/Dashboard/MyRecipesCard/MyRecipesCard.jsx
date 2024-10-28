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
    recipes.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

    // show the most recent 4 recipes
    recipes.length = 4;

    return (
      <section id="my-recipes-card-section">

          <h2 id="my-recipes-card-h2">Your Recent Recipes</h2>

          <div id="my-recipes-card-div">
            {recipes.map(recipe => {
              return <Link to={`/recipes/${recipe._id}`} key={recipe._id} className="my-recipe-link">
                <img loading="eager" className="my-recipe-img" alt={recipe.name} src={recipe.image} />
                <h3 className="my-recipe-h3">{recipe.name}</h3>
              </Link>
            })}
          </div>

      </section>
    )

  }

/* --------------------------------Exports--------------------------------*/

export default MyRecipesCard;