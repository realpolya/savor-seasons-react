/* --------------------------------Imports--------------------------------*/

import './RecipeForm.css';
import {useState, useEffect, useContext} from 'react';
import {useNavigate, useParams, useLocation} from 'react-router-dom';

import services from "../../services/index.js";

import {AuthContext} from '../../App.jsx';

/* --------------------------------Variables--------------------------------*/

const initial = {
    name: '',
    prepTime: '',
    author: '',
    description: '',
    holiday: '',
    image: '',
    ingredients: [],
}

/* --------------------------------Function--------------------------------*/


function RecipeForm() {

    const location = useLocation();
    const navigate = useNavigate();
    const {recipeId} = useParams();
    const {user} = useContext(AuthContext);

    const token = localStorage.getItem('token');

    const [formData, setFormData] = useState(initial);

    const [ingredientsList, setIngredientsList] = useState([]);
    const [error, setError] = useState(null); // Error handling

    // Fetch ingredients on mount
    useEffect(() => {

        async function fetchIngredients() {
            try {
                const data = await services.getAllIngredients(token);
                setIngredientsList(data);
            } catch (error) {
                console.error('Error fetching ingredients:', error);
                setError('Failed to load ingredients');
            }
        }

        async function fetchSingleRecipe(recipeId) {
            try {
              
                const recipeToEdit = await services.getSingleRecipe(recipeId, token)
                const ingrIds = [];

                // get ingredient ids
                if (recipeToEdit.ingredients) {
                    recipeToEdit.ingredients.forEach(ingr => ingrIds.push(ingr._id));
                }

                // populate formData array with ids from ingredients
                recipeToEdit.ingredients = [...ingrIds];
                setFormData(recipeToEdit);

            } catch (error) {
                console.error('Error fetching single recipe:', error);
            }
        }

        fetchIngredients();
        if (recipeId) {
            fetchSingleRecipe(recipeId);
        } else {
            setFormData(initial);
        }

    }, [recipeId, location.pathname]); // removed token from dependency array (token is being refetched)

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const {value, checked} = e.target;
        setFormData((prevData) => {
            const newIngredients = checked
                ? [...prevData.ingredients, value]
                : prevData.ingredients.filter((id) => id !== value);
            return {...prevData, ingredients: newIngredients};
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {...formData, author: user._id};

            if (recipeId) {
                // Update existing recipe
                await services.updateRecipe(recipeId, body, token);
            } else {
                // Create new recipe
                await services.createRecipe(body, token);
            }

            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('Error while submitting form:', error);
        }
    };

    return (
        <div className="recipe-form-wrapper">
            <div className="scroll-container">
                <form onSubmit={handleSubmit} className="recipe-form">
                    <h1>{recipeId ? 'Edit Recipe' : 'New Recipe'}</h1>

                    <label>
                        Recipe Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label> 

                    <label>
                        Preparation Time (in minutes)
                        <input
                            type="text"
                            name="prepTime"
                            value={formData.prepTime}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Description:
                        <textarea
                            name="description"
                            className="description-text-area"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Holiday:
                        <select
                            name="holiday"
                            value={formData.holiday}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>--- Select Holiday ---</option>
                            <option value="Not a Holiday">Everyday Recipes</option>
                            <option value="Christmas">Christmas</option>
                            <option value="Thanksgiving">Thanksgiving</option>
                            <option value="Easter">Easter</option>
                            <option value="Halloween">Halloween</option>
                        </select>
                    </label>

                    <label>
                        Image URL:
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <fieldset>
                        <legend>Select Ingredients:</legend>
                        <div className="ingredient-options">
                            {error ? (
                                <p>{error}</p>
                            ) : (
                                ingredientsList.map((ingredient) => {

                                    return <div key={ingredient._id} className="checkbox-item">
                                            <input

                                                type="checkbox"
                                                id={ingredient._id}
                                                value={ingredient._id}
                                                checked={formData.ingredients.includes(ingredient._id)}
                                                onChange={handleCheckboxChange}
                                                
                                            />
                                            <label htmlFor={ingredient._id}>{ingredient.name}</label>
                                    </div>

                                })
                            )}
                        </div>
                    </fieldset>

                    <button type="submit">Submit Recipe</button>
                </form>
            </div>
        </div>
    );
}

/* --------------------------------Exports--------------------------------*/

export default RecipeForm;

/* --------------------------------Test below--------------------------------*/

