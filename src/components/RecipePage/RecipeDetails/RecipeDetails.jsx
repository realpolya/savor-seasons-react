/* --------------------------------Imports--------------------------------*/

import RatingComponent from './Rating';

// css
import './RecipeDetails.css';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../../App.jsx';


/* --------------------------------Function--------------------------------*/

function RecipeDetails({ recipe }) {

    const {user, recipes, setRecipes} = useContext(AuthContext);

    // calculate recipe.rating
    recipe.rating = 0;
    if (recipe.reviews.length > 0) {

      recipe.reviews.forEach(review => recipe.rating += +review.rating);
      recipe.rating = recipe.rating / recipe.reviews.length;

    }

    return (
      <section id="recipe-details-section">

          <div className="recipe-card-div-img">
            <img loading="eager" className="recipe-card-img" alt={recipe.name} src={recipe.image} />
          </div>

          <div className="recipe-card-div-info">
            <h3 className="recipe-card-h3">{recipe.name}</h3>
            < RatingComponent rating={recipe.rating}/>
            <p className="recipe-card-rating">Rating: {recipe.rating}</p>
            <p className="recipe-card-holiday">
              {recipe.holiday}
            </p>
            <p className="recipe-card-author">
              By <span>{recipe.author.username}</span>
            </p>
            <p className="recipe-card-time">🕒 {recipe.prepTime} min</p>
            {/* <p className="recipe-card-time">🥕 {recipe.ingredients.length} ingredients</p> */}
            <p className="recipe-card-details">{recipe.description}</p>

            { user ? <Link to={`/recipes/${recipe._id}/edit`}>Edit</Link> : <></>}

            <Link to='/'>Back to Recipes</Link>

          </div>

      </section>
    )

  }

/* --------------------------------Exports--------------------------------*/

export default RecipeDetails;