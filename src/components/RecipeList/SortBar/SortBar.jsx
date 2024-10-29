/* --------------------------------Imports--------------------------------*/
import { useContext } from 'react';
import { AuthContext } from '../../../App.jsx';
import { Link } from 'react-router-dom';

// css
import './SortBar.css';

/* --------------------------------Function--------------------------------*/

function SortBar() {

    const {user, recipes, setRecipes} = useContext(AuthContext);

    // TODO: filter does not work 2 times in a row
    let filtered;
    const handleSubmit = e => {

      e.preventDefault();
      console.log(e)
      setRecipes(filtered);

    }

    const handleSortChange = e => {
      console.log(e)
    }

    const handleFilterChange = e => {
      
      // move to normal
      setRecipes(recipes);
      console.log(filtered);

      filtered = recipes.filter(recipe => {
        return recipe.holiday === e.target.value
      });

      console.log(filtered);

      handleSubmit(e);

    }

    const handleSearchChange = e => {
      console.log(e)
    }

    return (
      <section id="sort-bar-section">

          <div id="sort-filter-div">
            <form id="sort-form" onSubmit={handleSubmit}>
              <select id="sort-select" name="sort" onChange={handleSortChange}>
                    <option value="" disabled selected>---Sort---</option>
                    <option value="rating">By rating (best first)</option>
                    <option value="prepTime">By prep time (shortest first)</option>
                    <option value="ingredients">By number of ingredients (fewest first)</option>
              </select>
            </form>
            <form id="filter-form">
              <select id="filter-select" name="filter" onChange={handleFilterChange}>
                    <option value="" disabled selected>---Filter---</option>
                    <option value="Not a Holiday">Everyday recipes</option>
                    <option value="Christmas">Christmas recipes</option>
                    <option value="Thanksgiving">Thanksgiving recipes</option>
                    <option value="Easter">Easter recipes</option>
                    <option value="Halloween">Halloween recipes</option>
              </select>
            </form>
          </div>
          
          <div id="search-div">
            <form id="search-form" onSubmit={handleSubmit}>
              <input type="text" placeholder="e.g. mashed potatoes" name="search" onChange={handleSearchChange}/>
              <button className="search-form-button" type="submit">Search</button>
            </form>
          </div>

      </section>
    )

  }

/* --------------------------------Exports--------------------------------*/

export default SortBar;