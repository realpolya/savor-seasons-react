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
  // Funtion to handle Adding a new Review
  const handleAddReview = (newReview) => {
    const updateRecipe = {
      ...recipe,
      review: [...recipe.review, { ...newReview, reviewer: user.username }]
    };
    const updateRecipes = recipes.map(r =>
      r._id === recipe._id ? updateRecipe : r
    );
    setRecipes(updateRecipes);
  };
  
  return (
    <main id="recipe-page-main">
      <RecipeDetails recipe={recipe} />
      <ReviewForm onSubmitReview={handleAddReview}/>
      <ReviewsList recipe={recipe} />
    </main>
  );
}

/* --------------------------------Exports--------------------------------*/

export default RecipePage;