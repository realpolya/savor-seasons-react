/* --------------------------------Imports--------------------------------*/
import { useContext, createContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../../App.jsx';

import ReviewForm from './ReviewForm/ReviewForm.jsx';
import ReviewCard from './ReviewCard/ReviewCard.jsx';

import services from '../../../services/index.js';

// css
import './ReviewsList.css';

/* --------------------------------Variables--------------------------------*/

const ReviewContext = createContext(null);

/* --------------------------------Function--------------------------------*/

function ReviewsList({ recipe, setRecipe }) {

  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState(recipe.reviews);
  const [editForm, setEditForm] = useState(false);
  const [sortedReviews, setSortedReviews] = useState([]);
  const {recipeId} = useParams();

  const {user} = useContext(AuthContext);

  const showEditForm = (id) => setEditForm(id);


  /* FUNCTIONS FOR REVIEWS */
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
      setEditForm(false);
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

  /* USE CONTEXT */
  const reviewObject = { recipeId, handleAddReview, handleDeleteReview, showEditForm, handleUpdateReview };

  return (

    <ReviewContext.Provider value={reviewObject}>

      <section id="reviews-list-section">

        <h2 id="reviews-list-h2">Reviews</h2>

        { user ? (< ReviewForm condition={'new'} data={null}/>) : (<Link to='/sign-in' id="review-form-log-in-link">Log in to leave review.</Link>)}

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

            let card = (<ReviewCard key={review._id} match={match} review={review}/>)
            let form = (<ReviewForm key={review._id} condition={'edit'} data={review}/>)

            if (editForm === review._id) {
              return form;
            } 

            return card;

          })}

        </div>)}
        
      </section>

    </ReviewContext.Provider>

  )

}

/* --------------------------------Exports--------------------------------*/

export { ReviewContext };
export default ReviewsList;