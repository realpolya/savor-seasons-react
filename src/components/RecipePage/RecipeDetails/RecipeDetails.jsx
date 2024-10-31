/* --------------------------------Imports--------------------------------*/
import RatingComponent from './Rating';
// css
import './RecipeDetails.css';
import {useContext, useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {AuthContext} from '../../../App.jsx';
import {addRecipeToFavorites, removeRecipeFromFavorites, deleteRecipe} from "../../../services/index.js";

/* --------------------------------Function--------------------------------*/

function RecipeDetails({recipe}) {
// adding stuff

    const [loading, setLoading] = useState(true);
    const [recipeRating, setRecipeRating] = useState(0);
    const {user, favorites} = useContext(AuthContext);
    const {recipeId} = useParams()
    const token = localStorage.getItem('token');
    const navigate=useNavigate();

    const initialIsThisRecipeInFavorites = favorites.some((item) => item._id === recipeId) // boolean
    const [isThisRecipeInFavorites, setIsThisRecipeInFavorites] = useState(initialIsThisRecipeInFavorites);

    console.log(user, recipe)

    const isUserTheAuthor = recipe.author._id === user._id;

    useEffect(() => {

        if (recipe.author && recipe.ingredients) {
            if (recipe.reviews.length > 0) {

                let newRating = 0;
                recipe.reviews.forEach(review => newRating += +review.rating);
                newRating = newRating / recipe.reviews.length;
                setRecipeRating(newRating);

            }
            setLoading(false);
        } else {
            console.log('not loaded')
        }

    }, [recipe])

    const handleAddToFavorites = () => {
        addRecipeToFavorites(recipeId, token)
        setIsThisRecipeInFavorites(!isThisRecipeInFavorites)
    }

    const handleRemoveFromFavorites = () => {
        removeRecipeFromFavorites(recipeId, token)
        setIsThisRecipeInFavorites(!isThisRecipeInFavorites)

    }

    const handleDeleteRecipe=()=>{
        deleteRecipe(recipeId, token);
        navigate('/');
    }
    // recipe details logic buttons logic:
    // AUTHOR & LOGGED IN: Edit, Delete
    // NOT AUTHOR & LOGGED IN: add to favorites
    // NOT AUTHOR & LOGGED IN & IN FAVORITES: remove from favorites
    // everyone should: BACK TO RECIPES


    return (
        <section id="recipe-details-section">

            <div id="details-div-img">
                <img loading="eager"
                     id="details-img" alt={recipe.name} src={recipe.image}/>
            </div>

            <div id="details-div-info">
                <h3 id="details-h3">{recipe.name}</h3>
                <div id="details-rating-div">
                    < RatingComponent rating={recipeRating}/>
                    <p id="details-rating-p">{Math.trunc(recipeRating * 100) / 100} out of 5</p>
                </div>
                <p id="details-holiday">
                    {recipe.holiday}
                </p>

                {loading && !recipe.author ? (<p>Author loading...</p>) : (<p id="details-author">
                    By <span>{recipe.author?.username}</span>
                </p>)}

                <p id="details-time">🕒 {recipe.prepTime} min</p>
                <div id="details-ingredients">
                    <h5 id="details-ingredients-h5">Ingredients:</h5>

                    {loading && !recipe.ingredients ? (<p>Ingredients loading...</p>) : (
                        <div id="details-ingredients-list">
                            {recipe.ingredients?.map(ingredient => {
                                return <p key={ingredient._id} className="ingredient-p">🥕 {ingredient.name}</p>
                            })}
                        </div>)}

                </div>
                <p id="details-details">{recipe.description}</p>

                {isUserTheAuthor? <button><Link to={`/recipes/${recipe._id}/edit`}>Edit</Link></button> : <></>}
                {isUserTheAuthor? <button onClick={handleDeleteRecipe}>Delete</button> : <></>}
                {isThisRecipeInFavorites ? <button onClick={handleRemoveFromFavorites}>Remove from favorites</button> :
                    <button onClick={handleAddToFavorites}>Add to favorites</button>}

                <button><Link to='/'>Back to Recipes</Link></button>

            </div>

        </section>
    )

}

/* --------------------------------Exports--------------------------------*/

export default RecipeDetails;