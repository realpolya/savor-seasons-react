/* --------------------------------Imports--------------------------------*/
import RecipeDetails from './RecipeDetails/RecipeDetails.jsx';
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

      const fetchRecipe = async (id, token) => {
        try {
          const foundRecipe = await services.getSingleRecipe(id, token);
          setRecipe(foundRecipe);

          if (foundRecipe && Object.keys(foundRecipe).includes('prepTime')) {
            setLoading(false);
          }

        } catch (err) {
          console.log(err);
        }
      }

      fetchRecipe(recipeId, localStorage.getItem('token'));

  }, [recipeId])
  
  return (
    <main id="recipe-page-main">
      { loading ? <div>Recipe Details not loaded yet</div> : <RecipeDetails recipe={recipe} />}
      { loading ? <div>Reviews not loaded yet</div> : <ReviewsList recipe={recipe} setRecipe={setRecipe}/> }
    </main>
  );
}

/* --------------------------------Exports--------------------------------*/

export default RecipePage;