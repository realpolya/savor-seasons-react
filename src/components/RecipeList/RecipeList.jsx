/* --------------------------------Imports--------------------------------*/
import RecipeCard from './RecipeCard/RecipeCard.jsx';
import SortBar from './SortBar/SortBar.jsx';

// css
import './RecipeList.css';

/* --------------------------------Function--------------------------------*/

function RecipeList() {

    return (
      <main id="recipe-list-main">
          RecipeList
          < SortBar />
          < RecipeCard />
      </main>
    )

  }

/* --------------------------------Exports--------------------------------*/

export default RecipeList;