import './RecipeForm.css';
import { useState, useEffect } from 'react';
import { getAllIngredients } from '../../services/ingredientsService.js';
import { createRecipe } from '../../services/recipesService.js';
import { useNavigate } from 'react-router-dom';

function RecipeForm() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhb2xhIiwiX2lkIjoiNjcxZDVkMzRkZTAwNzNlYzgxNTJmNDA4IiwiaWF0IjoxNzMwMTgzMTU5fQ.Srso2zOywXsxgQInDtkNOEHAMhDYFGFt8ZZ4NlpuSGU";
    const navigate = useNavigate();

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

    useEffect(() => {
        async function fetchIngredients() {
            try {
                const data = await getAllIngredients(token);
                setIngredientsList(data);
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        }
        fetchIngredients();
    }, [token]);

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
            await createRecipe(body, token);
            navigate('/');
        } catch (error) {
            console.log('Error while submitting form:', error);
        }
    };

    return (
        <div className="recipe-form-wrapper">
            <div className="scroll-container">
                <form onSubmit={handleSubmit} className="recipe-form">
                    <label>Recipe Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </label>
                    <label>Preparation Time:
                        <input type="text" name="prepTime" value={formData.prepTime} onChange={handleChange} required />
                    </label>
                    <label>Description:
                        <textarea name="description" value={formData.description} onChange={handleChange} required />
                    </label>
                    {/*TODO: Change Holiday to a Dropdown having the Holiday options*/}
                    <label>Holiday:
                        <input type="text" name="holiday" value={formData.holiday} onChange={handleChange} required />
                    </label>

                    {/* Polina's form below */}
                    
                    <form id="filter-form">
                        <select id="filter-select" name="filter">
                                <option value="" disabled selected>---Holiday---</option>
                                <option value="Not a Holiday">Everyday recipes</option>
                                <option value="Christmas">Christmas recipes</option>
                                <option value="Thanksgiving">Thanksgiving recipes</option>
                                <option value="Easter">Easter recipes</option>
                                <option value="Halloween">Halloween recipes</option>
                        </select>
                    </form>

                    {/* Polina's form above */}

                    <label>Image URL:
                        <input type="url" name="image" value={formData.image} onChange={handleChange} required />
                    </label>
                    <fieldset>
                        <legend>Select Ingredients:</legend>
                        <div className="ingredient-options">
                            {ingredientsList.map((ingredient) => (
                                <div key={ingredient._id} className="checkbox-item">
                                    <input type="checkbox" id={ingredient._id} value={ingredient.name} onChange={handleCheckboxChange} />
                                    <label htmlFor={ingredient._id}>{ingredient.name}</label>
                                </div>
                            ))}
                        </div>
                    </fieldset>
                    <button type="submit">Submit Recipe</button>
                </form>
            </div>
        </div>
    );
}

export default RecipeForm;
