/* --------------------------------Imports--------------------------------*/
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
// contexts & services
import { AuthContext } from '../../App.jsx';
import * as authService from '../../services/authService';
// css
import './SignInForm.css';

/* --------------------------------Function--------------------------------*/

function SignInForm() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);
      console.log(user);
      setUser(user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

    return (
      <main>
        <h1>Log In</h1>
        {message && <p className="error-message">{message}</p>}
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              name="username"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              name="password"
              autoComplete="off"
              onChange={handleChange}
            />
          </div>
          <div>
            <button type='submit'>Log In</button>
            <Link to="/">
              <button type='button'>Cancel</button>
            </Link>
          </div>
        </form>
      </main>
    );
  }

/* --------------------------------Exports--------------------------------*/

export default SignInForm