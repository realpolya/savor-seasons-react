import RatingForm from './RatingForm';

// css
import './ReviewForm.css';
import {useState, useEffect} from "react";
/* --------------------------------Function--------------------------------*/

const ReviewForm = ({ onSubmitReview }) => {
    const [formData, setFormData] = useState({text: '' , rating:0});
    const[ error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

  const handleRatingChange = (newRating) => {
    setFormData({ ...formData, rating: newRating });
  };
  
  const handleChange = (e) => {
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
    <form onSubmit={handleSubmit}>
      < RatingForm rating={formData.rating} onRatingChange={handleRatingChange} />
      
        <label htmlFor="text-input"> Your Review: </label>
          <textarea
            required
            type="text"
            name="text"
            id="text-input"
            value={formData.text}
            onChange={handleChange}
      />
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{SuccessMessage}</p>}
      <button type="submit"> SUBMIT REVIEW</button>
    </form>
  );
};

/* --------------------------------Exports--------------------------------*/

export default ReviewForm;