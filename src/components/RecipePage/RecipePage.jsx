/* --------------------------------Imports--------------------------------*/
import RecipeDetails from './RecipeDetails/RecipeDetails.jsx';
import ReviewForm from './ReviewForm/ReviewForm.jsx';
import ReviewsList from './ReviewsList/ReviewsList.jsx';

import services from '../../services/index.js';

import { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../App.jsx';

// css
import './RecipePage.css';

/* --------------------------------Function--------------------------------*/

function RecipePage() {

  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState();
  const {user, recipes, setRecipes} = useContext(AuthContext);
  const {recipeId} = useParams();

  useEffect(() => {

    if (recipes.length > 0) {
      console.log('loaded');
      const newRecipe = recipes.find(recipe => {
        return JSON.stringify(recipe._id) === JSON.stringify(recipeId)}
      );
      setRecipe(newRecipe);
      setLoading(false)

    } else {
      console.log('not loaded')
    }

  }, [recipes])

  const handleAddReview = (newReview) => {
    console.log('ok');
  };

  // --Mandy's version below--
  // const handleAddReview = (newReview) => {
  //   const updateRecipe = {
  //     ...recipe,
  //     review: [...recipe.review, { ...newReview, reviewer: user.username }]
  //   };
  //   const updateRecipes = recipes.map(r =>
  //     r._id === recipe._id ? updateRecipe : r
  //   );
  //   setRecipes(updateRecipes);
  // };
  
  return (
    <main id="recipe-page-main">
      { loading ? <div>Recipe Details not loaded yet</div> : <RecipeDetails recipe={recipe} />}
      { loading ? <div>Review form not loaded yet</div> : <ReviewForm onSubmitReview={handleAddReview}/>}
      { loading ? <div>Reviews not loaded yet</div> : <ReviewsList recipe={recipe} /> }
    </main>
  );
}

/* --------------------------------Exports--------------------------------*/

export default RecipePage;