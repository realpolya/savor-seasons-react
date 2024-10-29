import './RecipeForm.css';
import { useState, useEffect } from 'react';
import { getAllIngredients } from '../../services/ingredientsService.js';
import { createRecipe, updateRecipe, singleRecipe } from '../../services/recipesService.js';
import { useNavigate, useParams } from 'react-router-dom';

function RecipeForm() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhb2xhIiwiX2lkIjoiNjcxZDVkMzRkZTAwNzNlYzgxNTJmNDA4IiwiaWF0IjoxNzMwMTgzMTU5fQ.Srso2zOywXsxgQInDtkNOEHAMhDYFGFt8ZZ4NlpuSGU"; // Replace with valid token logic
    const navigate = useNavigate();
    const { recipeId } = useParams(); // Get recipe ID from URL params

    const [formData, setFormData] = useState({
        name: '',
        prepTime: '',
        author: '',
        description: '',
        holiday: '',
        image: '',
        ingredients: [],
    });

    const [ingredientsList, setIngredientsList] = useState([]);
    const [error, setError] = useState(null); // Error handling

    // Fetch ingredients on mount
    useEffect(() => {
        async function fetchIngredients() {
            try {
                const data = await getAllIngredients(token);
                setIngredientsList(data);
            } catch (error) {
                console.error('Error fetching ingredients:', error);
                setError('Failed to load ingredients');
            }
        }
        fetchIngredients();
    }, [token]);

    // Fetch recipe if editing
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const recipeData = await singleRecipe(recipeId);
                setFormData(recipeData);
            } catch (error) {
                console.error('Error fetching the recipe:', error);
            }
        };
        if (recipeId) fetchRecipe();
    }, [recipeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => {
            const newIngredients = checked
                ? [...prevData.ingredients, value]
                : prevData.ingredients.filter((ingredient) => ingredient !== value);
            return { ...prevData, ingredients: newIngredients };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = { ...formData, author: "671d5d34de0073ec8152f408" };

            if (recipeId) {
                // Update existing recipe
                await updateRecipe(recipeId, body);
            } else {
                // Create new recipe
                await createRecipe(body, token);
            }

            navigate('/'); // Redirect to home page
        } catch (error) {
            console.log('Error while submitting form:', error);
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
                        Preparation Time:
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
                                ingredientsList.map((ingredient) => (
                                    <div key={ingredient._id} className="checkbox-item">
                                        <input
                                            type="checkbox"
                                            id={ingredient._id}
                                            value={ingredient.name}
                                            checked={formData.ingredients.includes(ingredient.name)}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label htmlFor={ingredient._id}>{ingredient.name}</label>
                                    </div>
                                ))
                            )}
                        </div>
                    </fieldset>

                    <button type="submit">Submit Recipe</button>
                </form>
            </div>
        </div>
    );
}

export default RecipeForm;

