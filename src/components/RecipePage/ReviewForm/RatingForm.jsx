/* --------------------------------Imports--------------------------------*/

import { Rating } from 'react-simple-star-rating';

/* --------------------------------Function--------------------------------*/

function RatingForm({ rating }) {

    return (
        <div className='stars-rating'>
          {/* set initial value */}
          <Rating initialValue={rating} 
          size='25' readonly fillClassName='stars-icon'
          emptyColor='#F9FFCA' fillColor='#CE2D4F' />
        </div>
    )
}

/* --------------------------------Exports--------------------------------*/

export default RatingForm