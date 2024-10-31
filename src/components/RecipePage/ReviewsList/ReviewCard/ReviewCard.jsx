/* --------------------------------Imports--------------------------------*/
import { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../../../App.jsx';
import { ReviewContext } from '../ReviewsList.jsx';

import RatingsReviews from './RatingsReviews.jsx';


// css
import './ReviewCard.css';

/* --------------------------------Function--------------------------------*/

function ReviewCard({ match, review }) {

    const {recipeId, handleDeleteReview, showEditForm} = useContext(ReviewContext);
  
    return (
    
        <div className="review-div" key={review._id}>

              <h3 className="review-h3">{review.name}</h3>

              <div className="review-author-rating">
                <p><span>by</span> {review?.reviewer.username}</p>
                <div className="review-rating-div">
                  <p className="review-rating-text">{review.rating} out of 5</p>
                  < RatingsReviews rating={review.rating}/>
                </div>
              </div>

              <p className="review-text">
                {review.text}
              </p>

              {/* use a ternary for showing buttons */}
              { match ? (<div className="review-card-buttons">

                <button onClick={() => handleDeleteReview(recipeId, review._id)}
                className="delete-review-button">Delete Review</button>

                <button onClick={() => showEditForm(review._id)}
                className="edit-review-button">Edit Review</button>

              </div>) : null }

              <p className="review-date">
                {new Date(review.createdAt).toLocaleString()}
              </p>
              
        </div>
  )
}

export default ReviewCard