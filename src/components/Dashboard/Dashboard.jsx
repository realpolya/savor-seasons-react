/* --------------------------------Imports--------------------------------*/
import MyRecipesCard from './MyRecipesCard/MyRecipesCard.jsx';
import MyActions from './MyActions/MyActions.jsx';
import MyFavoritesTable from './MyFavoritesTable/MyFavoritesTable.jsx';

// css
import './Dashboard.css';

/* --------------------------------Function--------------------------------*/

function Dashboard() {

    return (
      <main id="dashboard-main">
          < MyRecipesCard />
          <div id="actions-favorites">
            < MyActions />
            < MyFavoritesTable />
          </div>
      </main>
    )

  }

/* --------------------------------Exports--------------------------------*/

export default Dashboard;