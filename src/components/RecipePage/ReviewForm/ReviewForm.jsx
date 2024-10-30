import RatingForm from './RatingForm';

// css
import './ReviewForm.css';
import {useState, useEffect} from "react";
/* --------------------------------Function--------------------------------*/

const ReviewForm = ({ onSubmitReview }) => {
  
    const [formData, setFormData] = useState({
      name: '', 
      text: '',
      rating: 0
    });

    const [rating, setRating] = useState(0)

    const handleRating = (rate) => {
      setRating(rate);
    }

    const[error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

  const handleRatingChange = (e) => {
    console.log(e.target.value)
    // setFormData({ ...formData, rating: newRating });
  };
  
  const handleChange = (e) => {
    console.log(e.target.value)
    setFormData({...formData, [e.target.name]: e.target.value});
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.text || formData.rating === 0) { //handleAddReview
      setError("Please enter a review text and select a reating");
      return;
    }
    setError(null);
    onSubmitReview(formData);
    setFormData({ text: '', rating: 0 });
    setSuccessMessage("Review submitted successfully");

    setTimeout(() => {
      setSuccessMessage(""), 3000;
    }, timeout);
  };


  return (
    <form onSubmit={handleSubmit} id="review-form">

      <div>
        <label htmlFor="">
        Title:
        </label>
        <input type="text"
          name="prepTime"
          value={formData.prepTime}
          onChange={handleChange}
          required />
      </div>

      < RatingForm rating={formData.rating} 
      onRatingChange={handleRatingChange} />
      
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