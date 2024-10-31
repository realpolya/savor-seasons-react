/* --------------------------------Imports--------------------------------*/

import { Rating } from 'react-simple-star-rating';

/* --------------------------------Function--------------------------------*/

function RatingForm({ setRating }) {

  const handleRatingChange = (rate) => {
    console.log(rate)
    setRating(rate);
  };

  return (
      <div className='stars-rating'>
          <Rating initialValue='0' 
          size='25' fillClassName='stars-icon'
          emptyColor='#F9FFCA' fillColor='#CE2D4F'
          onClick={handleRatingChange} />
      </div>
  )
}

/* --------------------------------Exports--------------------------------*/

export default RatingForm