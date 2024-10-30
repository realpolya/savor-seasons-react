/* --------------------------------Imports--------------------------------*/

import { Rating } from 'react-simple-star-rating';

/* --------------------------------Function--------------------------------*/

function RatingComponent({ rating }) {
  
  return (
    <div className='stars-rating'>
      <Rating initialValue={rating}
        size='25' fillClassName='stars-icon'
        emptyColor='#F9FFCA' readonly fillColor='#CE2D4F'
        allowFraction />
    </div>
  );
}

/* --------------------------------Exports--------------------------------*/

export default RatingComponent;