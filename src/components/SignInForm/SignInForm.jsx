/* --------------------------------Imports--------------------------------*/
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';

// contexts & services
import { AuthContext } from '../../App.jsx';

// css
import './SignInForm.css';

/* --------------------------------Function--------------------------------*/

function SignInForm() {

    const {setUser} = useContext(AuthContext);

    return (
      <main>
          SignInForm
      </main>
    )
  }

/* --------------------------------Exports--------------------------------*/

export default SignInForm