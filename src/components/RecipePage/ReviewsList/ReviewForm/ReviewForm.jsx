/* --------------------------------Imports--------------------------------*/
import {useState, useEffect, useContext} from "react";
import { useParams } from 'react-router-dom';
import RatingForm from './RatingForm';
import { ReviewContext } from '../ReviewsList.jsx';

import services from '../../../../services/index.js'

// css
import './ReviewForm.css';

/* --------------------------------Function--------------------------------*/

const initialForm = {
  name: '', 
  text: '',
  rating: 0
}

const ReviewForm = ({ condition, data }) => {

    const {handleAddReview, handleUpdateReview} = useContext(ReviewContext);

    const {recipeId} = useParams();
  
    const [formData, setFormData] = useState(initialForm);
    const [rating, setRating] = useState(0);

    const[error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
    };
  
    const handleSubmit = (e) => {

      e.preventDefault();

      if (!formData.text || !formData.name || formData.rating === 0) { //handleAddReview
        setError("Please enter a review title, text, and rating");
        return;
      }

      if (!data) {
        handleAddReview(recipeId, formData);
        setSuccessMessage("Review submitted successfully");
        setTimeout(() => {
          setSuccessMessage("")
        }, 3000);
        setFormData(initialForm);
      } else {
        handleUpdateReview(recipeId, data._id, formData);
      }

      setError(null);

    };

    // set rating
    useEffect(() => {
      setFormData((prev) => {return {...prev, rating}})
    }, [rating])

    useEffect(() => {

      if (data) {
        setFormData(data);
        setRating(data.rating);
      }
      
    }, [data])


  return (
    <form onSubmit={handleSubmit} id="review-form">

      {condition === "new" ? <h3>Leave a Review</h3> : <h3>Edit Review</h3>}

      <div className="review-form-div review-form-div-title-rating">
        <div className="review-form-div-title">
          <label htmlFor="" className="review-form-div-title-label">
          Title:
          </label>
          <input type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required />
        </div>
        <div className="review-form-div-rating">< RatingForm setRating={setRating} rating={rating}/></div>
      </div>
      
      <div className="review-form-div review-form-div-text">
        <label htmlFor="text-input" className="review-form-div-title-label"> Your Review: </label>
        <textarea
          className="review-form-div-textarea"
          required
          type="text"
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />
      </div>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {condition === "new" ? 
      (<button type="submit">Submit Review</button>) : 
      (<button type="submit">Edit Review</button>)}

    </form>
  );
};

/* --------------------------------Exports--------------------------------*/

export default ReviewForm;