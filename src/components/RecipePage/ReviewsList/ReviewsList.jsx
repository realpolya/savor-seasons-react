/* --------------------------------Imports--------------------------------*/
import { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../../App.jsx';

import RatingsReviews from './RatingsReviews';
import ReviewForm from './ReviewForm/ReviewForm.jsx';

// css
import './ReviewsList.css';

/* --------------------------------Function--------------------------------*/

function ReviewsList({ recipe }) {

    // review logic buttons logic:
    // AUTHOR & LOGGED IN: Edit Review, Delete Review
    // --> once you click Edit – form for edit appears!

    const {user, recipes, setRecipes} = useContext(AuthContext);

    const handleAddReview = (newReview) => {
      console.log('ok');
    };
  
    // --Mandy's version below--
    // const handleAddReview = (newReview) => {
    //   const updateRecipe = {
    //     ...recipe,
    //     review: [...recipe.review, { ...newReview, reviewer: user.username }]
    //   };
    //   const updateRecipes = recipes.map(r =>
    //     r._id === recipe._id ? updateRecipe : r
    //   );
    //   setRecipes(updateRecipes);
    // };

    return (

      <section className="reviews-list-section">

        <h2 id="reviews-list-h2">Reviews</h2>

        { user ? (< ReviewForm />) : (<Link to='/sign-in' id="review-form-log-in-link">Log in to leave review.</Link>)}

        <div className="reviews-list">
          {recipe.reviews.map(review => {
            return <div className="review-div">
                <h3 className="review-h3">{review.name}</h3>
                <div className="review-author-rating">
                  <p><span>by</span> {review.reviewer}</p>
                  <div className="review-rating-div">
                    <p className="review-rating-text">{review.rating} out of 5</p>
                    < RatingsReviews rating={review.rating}/>
                  </div>
                </div>
                <p className="review-text">
                  {review.text}
                </p>
              </div>
          })}
        </div>
      </section>

    )

  }

/* --------------------------------Exports--------------------------------*/

export default ReviewsList;

// name: {
//   type: String,
//   required: true,
// },
// text: {
//   type: String,
//   required: true,
// },
// rating: {
//   type: Number,
//   required: true,
//   enum: [1, 2, 3, 4, 5],
// },