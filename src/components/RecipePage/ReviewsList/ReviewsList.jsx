/* --------------------------------Imports--------------------------------*/

import RatingsReviews from './RatingsReviews';

// css
import './ReviewsList.css';

/* --------------------------------Function--------------------------------*/

function ReviewsList({ recipe }) {

    return (

      <section className="reviews-list">

        <h2 id="reviews-list-h2">Reviews</h2>

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