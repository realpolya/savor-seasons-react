/* --------------------------------Imports--------------------------------*/
import { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../../App.jsx';

import RatingsReviews from './RatingsReviews';
import ReviewForm from './ReviewForm/ReviewForm.jsx';
import ReviewCard from './ReviewCard/ReviewCard.jsx';

import services from '../../../services/index.js';

// css
import './ReviewsList.css';

/* --------------------------------Function--------------------------------*/

function ReviewsList({ recipe, setRecipe }) {

  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState(recipe.reviews);
  const [editForm, setEditForm] = useState(false);
  const [sortedReviews, setSortedReviews] = useState([]);
  const {recipeId} = useParams();

  const {user, recipes, setRecipes} = useContext(AuthContext);

  const showEditForm = () => setEditForm(true);

  const handleAddReview = async (recipeId, data) => {
    try {
      const newReview = await services.createReview(recipeId, data);
      setReviews((prev) => {
        return [...prev, newReview]
      });
      return newReview;
    } catch(err) {
      console.log(err)
    }
  };

  const handleUpdateReview = async (recipeId, reviewId, data) => {
    try {
      const updatedReview = await services.updateReview(recipeId, reviewId, data);
      setReviews((prev) => {
        return [...prev, updatedReview]
      });
      return updatedReview;
    } catch(err) {
      console.log(err)
    }
  };

  const handleDeleteReview = async (recipeId, reviewId) => {
    try {
      const deletedReview = await services.deleteReview(recipeId, reviewId);
      setReviews((prev) => {
        console.log('prev is ', prev);
        return prev.filter(review => review._id !== deletedReview._id)
      });
      console.log('this is being deleted ', deletedReview);
      return deletedReview;
    } catch(err) {
      console.log(err)
    }
  };


  /* USE EFFECT */
  useEffect(() => {

    try {

      if (recipe.reviews) {

        setSortedReviews([...recipe.reviews]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))

      }

      console.log('recipe.reviews are ', recipe.reviews);

    } catch(err) {
      console.error(err);
    }

  }, [recipe, reviews])

  useEffect(() => {

    try {

      const fetchRecipe = async (id, token) => {
        try {

          const foundRecipe = await services.getSingleRecipe(id, token);
          setRecipe(foundRecipe);

          if (foundRecipe && Object.keys(foundRecipe).includes('prepTime')) {
            console.log('changing the loading')
            setLoading(false);
          }

        } catch (err) {
          console.log(err);
        }
      }
      
      fetchRecipe(recipeId, localStorage.getItem('token'));

    } catch(err) {
      console.log(err);
    }
    
  }, [reviews])


  return (

    <section className="reviews-list-section">

      <h2 id="reviews-list-h2">Reviews</h2>

      { user ? (< ReviewForm handleAddReview={handleAddReview}/>) : (<Link to='/sign-in' id="review-form-log-in-link">Log in to leave review.</Link>)}

      { loading ? (<p>Reviews are loading...</p>) : (<div className="reviews-list">
        
        { sortedReviews.map(review => {

          let match = false;

          try {
              if (review.reviewer && user) {
                  if (JSON.stringify(review.reviewer._id) === JSON.stringify(user._id)) {
                      match = true;
                  }
              }
          } catch(err) {
              console.log(err);
          }

          return ( 
          
          <div className="review-div" key={review._id}>

              < ReviewCard />

              <h3 className="review-h3">{review.name}</h3>

              <div className="review-author-rating">
                <p><span>by</span> {review.reviewer.username}</p>
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

                <button onClick={() => handleUpdateReview(recipeId, review._id)}
                className="delete-review-button">Delete Review</button>

                <button onClick={() => handleDeleteReview(recipeId, review._id)}
                className="edit-review-button">Edit Review</button>

              </div>) : null }

              <p className="review-date">
                {new Date(review.createdAt).toLocaleString()}
              </p>
              
          </div>)


        })}

      </div>)}
      
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