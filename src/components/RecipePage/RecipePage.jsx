/* --------------------------------Imports--------------------------------*/
import RecipeDetails from './RecipeDetails/RecipeDetails.jsx';
import ReviewForm from './ReviewForm/ReviewForm.jsx';
import ReviewsList from './ReviewsList/ReviewsList.jsx';

import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../App.jsx';

// css
import './RecipePage.css';

/* --------------------------------Function--------------------------------*/

function RecipePage() {

  const {recipeId} = useParams();
  console.log(recipeId);
  const {user, recipes, setRecipes} = useContext(AuthContext);

  const recipe = recipes.find(recipe => JSON.stringify(recipe._id) === JSON.stringify(recipeId))
  console.log(recipe);
  return (
    <main id="recipe-page-main">
      <RecipeDetails recipe={recipe} />
      <ReviewForm />
      <ReviewsList />
    </main>
  );
}

/* --------------------------------Exports--------------------------------*/

export default RecipePage;