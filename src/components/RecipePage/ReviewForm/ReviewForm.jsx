/* --------------------------------Imports--------------------------------*/

import RatingForm from './RatingForm';

// css
import './ReviewForm.css';
import {useState,useEffect} from "react";
/* --------------------------------Function--------------------------------*/

const ReviewForm = (props) => {
    const [formData, setFormData] = useState({text: '' , rating:0});
    const[ error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
   const handleRatingChange= (newRating)=>{
       setFormData({...formData, rating: newRating});
   }
    const handleSubmit = (e) => {
        e.preventDefault();
        //handleAddReview
        setFormData({text: '', rating: 0 });
    };


    return (
        <form onSubmit={handleSubmit}>
            < RatingForm  rating= {formData.rating} onRatingChange={handleRatingChange}/>
            <label htmlFor="text-input"> Your Review: </label>
            <textarea
                required
                type="text"
                name="text"
                id="text-input"
                value={formData.text}
                onChange={handleChange}
            />
            <button type="submit"> SUBMIT REVIEW</button>
        </form>
    );
};




/* --------------------------------Exports--------------------------------*/

export default ReviewForm;