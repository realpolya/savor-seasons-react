/* --------------------------------Imports--------------------------------*/
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../../App.jsx';

// css
import './MyRecipesCard.css';

/* --------------------------------Function--------------------------------*/

function MyRecipesCard() {

    const {user, recipes, setRecipes, userRecipes } = useContext(AuthContext);

    console.log('user recipes on my recipes card are ', userRecipes);
    userRecipes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // show the most recent 4 recipes
    const myRecipesShort = [...userRecipes];
    myRecipesShort.length = 4;

    return (
      <section id="my-recipes-card-section">

          <Link id="my-recipes-view-link">
            <h2 id="my-recipes-card-h2">Your Recent Recipes</h2>
            <p id="my-recipes-card-p-link">View All</p>
          </Link>

          <div id="my-recipes-card-div">
            {myRecipesShort.map(recipe => {
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