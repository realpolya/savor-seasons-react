/* --------------------------------Imports--------------------------------*/
import { useState, useEffect } from 'react';
import RatingComponent from './Rating.jsx';


// css
import './RecipeCard.css';

/* --------------------------------Function--------------------------------*/

function RecipeCard({ recipe }) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (recipe.author) {

        console.log('loaded');
        setLoading(false);

      } else {

        console.log('not loaded');

      }
    }, [recipe.author]);

    // calculate recipe.rating
    recipe.rating = 0;
    if (recipe.reviews.length > 0) {

      recipe.reviews.forEach(review => recipe.rating += +review.rating);
      recipe.rating = recipe.rating / recipe.reviews.length;

    }

    return (
      <section className="recipe-card-section">
        
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
              {loading ? <span>User not loaded yet</span> : <span>By {recipe.author.username}</span> }
            </p>
            <p className="recipe-card-time">🕒 {recipe.prepTime} min</p>
            {/* <p className="recipe-card-time">🥕 {recipe.ingredients.length} ingredients</p> */}
            <p className="recipe-card-details">{recipe.description}</p>
            <button className="recipe-card-button">View</button>
          </div>
      </section>
    )

}

/* --------------------------------Exports--------------------------------*/

export default RecipeCard;