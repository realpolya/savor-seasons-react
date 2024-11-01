/* --------------------------------Imports--------------------------------*/
import RatingComponent from './Rating';
import {useContext, useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {AuthContext} from '../../../App.jsx';
import {addRecipeToFavorites, removeRecipeFromFavorites, deleteRecipe} from "../../../services/index.js";

// css
import './RecipeDetails.css';

/* --------------------------------Function--------------------------------*/

function RecipeDetails({recipe}) {

    const [loading, setLoading] = useState(true);
    const [isUserTheAuthor, setIsUserTheAuthor] = useState(false);
    const [recipeRating, setRecipeRating] = useState(0);
    const {user, favorites} = useContext(AuthContext);
    const {recipeId} = useParams()
    const token = localStorage.getItem('token');
    const navigate=useNavigate();

    const initialInFavorites = favorites.some((item) => item._id === recipeId) // boolean
    const [isInFavorites, setIsInFavorites] = useState(initialInFavorites);

    useEffect(() => {

        try {

            if (recipe.author && recipe.ingredients) {
                
                if (recipe.reviews.length > 0) {

                    let newRating = 0;
                    recipe.reviews.forEach(review => newRating += +review.rating);
                    newRating = newRating / recipe.reviews.length;
                    setRecipeRating(newRating);
                    
                }

                setLoading(false);
                if (user) {
                    if (recipe.author._id === user._id) {

                        setIsUserTheAuthor(true);

                    }
                }

            } else {

                console.log('not loaded')

            }

        } catch(err) {

            console.error(err);

        }


    }, [recipe])

    const handleAddToFavorites = () => {
        addRecipeToFavorites(recipeId, token)
        setIsInFavorites(!isInFavorites)
    }

    const handleRemoveFromFavorites = () => {
        removeRecipeFromFavorites(recipeId, token)
        setIsInFavorites(!isInFavorites)

    }

    const handleDeleteRecipe=()=>{
        deleteRecipe(recipeId, token);
        navigate('/');
    }

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
                    {recipeRating === 0 
                    ? (<p id="details-rating-p">Not rated yet</p>)
                    : (<p id="details-rating-p">{Math.trunc(recipeRating * 100) / 100} out of 5</p>)}
                </div>
                <p id="details-holiday">
                    Theme: <span>{recipe.holiday}</span>
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
                                return <p key={ingredient._id} className="ingredient-p">{ingredient.name}</p>
                            })}
                        </div>)}

                </div>
                <p id="details-details">{recipe.description}</p>

                {isUserTheAuthor ? <button><Link to={`/recipes/${recipe._id}/edit`}>Edit</Link></button> : <></>}
                {isUserTheAuthor ? <button onClick={handleDeleteRecipe}>Delete</button> : <></>}
                {isInFavorites ? <button onClick={handleRemoveFromFavorites}>Remove from favorites</button> :
                    <button onClick={handleAddToFavorites}>Add to favorites</button>}

                <button><Link to='/'>Back to Recipes</Link></button>

            </div>

        </section>
    )

}

/* --------------------------------Exports--------------------------------*/

export default RecipeDetails;