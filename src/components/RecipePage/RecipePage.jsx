/* --------------------------------Imports--------------------------------*/
import RecipeDetails from './RecipeDetails/RecipeDetails.jsx';
import ReviewForm from './ReviewForm/ReviewForm.jsx';
import ReviewsList from './ReviewsList/ReviewsList.jsx';

// css
import './RecipePage.css';

/* --------------------------------Function--------------------------------*/

function RecipePage() {

    return (
      <main id="recipe-page-main">
          RecipePage
          <RecipeDetails/>
          <ReviewForm/>
          <ReviewsList/>
      </main>
    )

}

/* --------------------------------Exports--------------------------------*/

export default RecipePage;