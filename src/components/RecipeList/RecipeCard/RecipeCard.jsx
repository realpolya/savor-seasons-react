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
            <div className="recipe-card-rating-div">
              < RatingComponent rating={recipe.rating}/>
              {recipe.rating === 0 
              ? (<p className="recipe-card-rating">Not rated yet</p>)
              : (<p className="recipe-card-rating">{Math.trunc(recipe.rating * 100) / 100} out of 5</p>)}
            </div>
            <p className="recipe-card-holiday">
              {recipe.holiday}
            </p>
            <div className="recipe-card-author">
              {loading ? <p className="recipe-card-author-p">User not loaded yet</p> : <p className="recipe-card-author-p">By <span>{recipe.author.username}</span></p> }
            </div>
            <p className="recipe-card-time">🕒 {recipe.prepTime} min</p>
            <p className="recipe-card-details">{recipe.description}</p>
            <button className="recipe-card-button">View</button>
          </div>
      </section>
      
    )

}

/* --------------------------------Exports--------------------------------*/

export default RecipeCard;