/* --------------------------------Imports--------------------------------*/
import { useState, useContext } from 'react';
import { AuthContext } from '../../../App.jsx';

import { sortRecipes, searchRecipes } from '../../../services/index.js';

// css
import './SortBar.css';

/* --------------------------------Function--------------------------------*/

function SortBar({ listRecipes, setListRecipes }) {

    const [searchData, setSearchData] = useState('');
    const {user, allRecipes, recipes, userRecipes, favorites, setRecipes} = useContext(AuthContext);

    // variable for storing filtered recipes
    let filtered;

    /* RESET FUNCTION */
    const restoreRecipes = () => setListRecipes(allRecipes); // TODO: fix based on condition

    /* SUBMIT FUNCTIONS */
    const handleSubmit = e => {

      e.preventDefault();
      // setRecipes(filtered);
      setListRecipes(filtered)

    }

    const handleSearchSubmit = e => {

      e.preventDefault();
      filtered = searchRecipes(searchData, listRecipes);
      // setRecipes(filtered);
      setListRecipes(filtered);

    }

    /* CHANGE FUNCTIONS */
    const handleSortChange = e => {

      console.log('in sorted', e.target.value);
      console.log('before', listRecipes)

      filtered = sortRecipes(e.target.value, listRecipes);
      console.log('after', filtered)
      
      handleSubmit(e);

    }

    const handleFilterChange = (e) => {

      filtered = listRecipes.filter(recipe => {
        return recipe.holiday === e.target.value
      });

      handleSubmit(e);

    }

    const handleSearchChange = e => setSearchData(e.target.value);


    return (
      <section id="sort-bar-section">

          <div id="sort-filter-div">
            <form id="sort-form" onSubmit={handleSubmit}>
              <select id="sort-select" name="sort" onChange={handleSortChange}>
                    <option value="" disabled selected>---Sort---</option>
                    <option value="rating">By rating (best first)</option>
                    <option value="prepTime">By prep time (shortest first)</option>
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

            <form id="sort-filter-form-button" onSubmit={restoreRecipes}>
              <button className="search-form-button" type="submit">Reset</button>
            </form>
          </div>
          
          <div id="search-div">
            <form id="search-form" onSubmit={handleSearchSubmit}>
              <input required 
                      type="text" 
                      placeholder="e.g. mashed potatoes" 
                      name="search" 
                      value={searchData}
                      onChange={handleSearchChange}/>
              <button className="search-form-button" type="submit">Search</button>
            </form>
          </div>

      </section>
    )

  }

/* --------------------------------Exports--------------------------------*/

export default SortBar;