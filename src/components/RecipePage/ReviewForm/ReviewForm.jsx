/* --------------------------------Imports--------------------------------*/

import RatingForm from './RatingForm';

// css
import './ReviewForm.css';

/* --------------------------------Function--------------------------------*/

function ReviewForm() {

    return (
      <section id="review-form">
        <textarea placeholder="Type your review here..."></textarea>
        <div className="review-action">
          <button type="button">Leave Review</button>
        </div>
      </section>
    )

  }

/* --------------------------------Exports--------------------------------*/

export default ReviewForm;