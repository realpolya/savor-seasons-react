/* --------------------------------Imports--------------------------------*/

// css
import './RecipeCard.css';

/* --------------------------------Function--------------------------------*/

function RecipeCard({ recipe }) {

    // calculated recipe.rating
    recipe.rating = 0;
    if (recipe.reviews.length > 0) {

      recipe.reviews.forEach(review => +recipe.rating + +review.rating);
      recipe.rating = recipe.rating / recipe.reviews.length;

    }

    return (
      <section className="recipe-card-section">
          <div className="recipe-card-div-img">
            <img loading="eager" className="recipe-card-img" alt={recipe.name} src={recipe.image} />
          </div>
          <div className="recipe-card-div-info">
            <h3 className="recipe-card-h3">{recipe.name}</h3>
            <p className="recipe-card-rating">{recipe.rating}</p>
          </div>
      </section>
    )

}

/* --------------------------------Exports--------------------------------*/

export default RecipeCard;