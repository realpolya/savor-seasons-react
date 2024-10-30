/* --------------------------------Imports--------------------------------*/
import {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import RatingForm from './RatingForm';

import services from '../../../../services/index.js'

// css
import './ReviewForm.css';

/* --------------------------------Function--------------------------------*/

const initialForm = {
  name: '', 
  text: '',
  rating: 0
}

const ReviewForm = ({ handleAddReview }) => {

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
        setError("Please enter a review text and select a rating");
        return;
      }

      handleAddReview(recipeId, formData);
      setError(null);
      setFormData(initialForm);
      setSuccessMessage("Review submitted successfully");

      setTimeout(() => {
        setSuccessMessage("")
      }, 3000);

    };

    // set rating
    useEffect(() => {
      setFormData((prev) => {return {...prev, rating}})
    }, [rating])


  return (
    <form onSubmit={handleSubmit} id="review-form">

      <h3>Leave a Review</h3>

      <div>
        <label htmlFor="">
        Title:
        </label>
        <input type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required />
      </div>

      < RatingForm setRating={setRating} />
      
      <div id="review-form-text-div">
        <label htmlFor="text-input"> Your Review: </label>
        <textarea
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
      <button type="submit">Submit Review</button>
    </form>
  );
};

/* --------------------------------Exports--------------------------------*/

export default ReviewForm;