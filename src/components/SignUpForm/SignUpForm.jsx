/* --------------------------------Imports--------------------------------*/

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';

// contexts & services
import { AuthContext } from '../../App.jsx';

// css
import './SignUpForm.css';

/* --------------------------------Function--------------------------------*/

function SignUpForm() {

    const {setUser} = useContext(AuthContext);

    return (
      <main>
          SignUpForm
      </main>
    )
  }

/* --------------------------------Exports--------------------------------*/

export default SignUpForm