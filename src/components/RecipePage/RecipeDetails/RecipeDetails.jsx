/* --------------------------------Imports--------------------------------*/
import RatingComponent from './Rating';
// css
import './RecipeDetails.css';
import {Link} from 'react-router-dom'

/* --------------------------------Function--------------------------------*/

function RecipeDetails() {

    return (
      <section id="recipe-details-section">
          <Link to={`/recipes/${recipeId}/edit`}>Edit</Link>
          <button>
              Edit/Delete
          </button>
      </section>
    )

  }

/* --------------------------------Exports--------------------------------*/

export default RecipeDetails;