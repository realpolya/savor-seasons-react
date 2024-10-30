/* --------------------------------Imports--------------------------------*/
import RatingComponent from './Rating';
// css
import './RecipeDetails.css';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../../App.jsx';
import ReviewForm from "../ReviewForm/ReviewForm.jsx";

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

          <div id="details-div-img">
            <img loading="eager"
            id="details-img" alt={recipe.name} src={recipe.image} />
          </div>

          <div id="details-div-info">
            <h3 id="details-h3">{recipe.name}</h3>
            <div id="details-rating-div">
              < RatingComponent rating={recipe.rating}/>
              <p id="details-rating">Rating: {recipe.rating}</p>
            </div>
            <p id="details-holiday">
              {recipe.holiday}
            </p>
            <p id="details-author">
              By <span>{recipe.author.username}</span>
            </p>
            <p id="details-time">🕒 {recipe.prepTime} min</p>
            {/* <p id="details-time">🥕 {recipe.ingredients.length} ingredients</p> */}
            <p id="details-details">{recipe.description}</p>

            { user ? <Link to={`/recipes/${recipe._id}/edit`}>Edit</Link> : <></>}

            <Link to='/'>Back to Recipes</Link>

          </div>

      </section>
    )

  }

/* --------------------------------Exports--------------------------------*/

export default RecipeDetails;