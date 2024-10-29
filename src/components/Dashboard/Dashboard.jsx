/* --------------------------------Imports--------------------------------*/

import { useContext } from 'react';
import { AuthContext } from '../../App.jsx';

import MyRecipesCard from './MyRecipesCard/MyRecipesCard.jsx';
import MyActions from './MyActions/MyActions.jsx';
import MyFavoritesTable from './MyFavoritesTable/MyFavoritesTable.jsx';

// css
import './Dashboard.css';

/* --------------------------------Function--------------------------------*/

function Dashboard() {

    const {user} = useContext(AuthContext);
    console.log(user);

    return (
      <main id="dashboard-main">
          <h2 id="dashboard-h2">Welcome !</h2>
          <div id="dashboard-div">
            < MyRecipesCard />
            <div id="actions-favorites">
              < MyActions />
              < MyFavoritesTable />
            </div>
          </div>
      </main>
    )

  }

/* --------------------------------Exports--------------------------------*/

export default Dashboard;
