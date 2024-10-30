/* --------------------------------Imports--------------------------------*/
import { useState, useContext  } from 'react';
import { Link, useNavigate } from 'react-router-dom'
// contexts & services
import { AuthContext } from '../../App.jsx';
import { signUp } from '../../services/index.js';

// css
import './SignUpForm.css';

/* --------------------------------Function--------------------------------*/

function SignUpForm() {

  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
  });

  const { setUser } = useContext(AuthContext);

  const updateMessage = (data) => setMessage(data);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {

      console.log(formData);

      const newUserResponse = await signUp(formData);
      console.log(newUserResponse.user)
      setUser(newUserResponse.user);
      navigate('/home');

    } catch (err) {

      updateMessage(err.message);

    }

  };


  const { username, password, passwordConf } = formData;

  //TODO: check for email too
  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main>
      <h1>Sign Up</h1>
      {message && <p className="error-message">{message}</p>}
      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="passwordConf">Confirm Password:</label>
          <input
            type="password"
            id="passwordConf"
            value={formData.passwordConf}
            name="passwordConf"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="submit" disabled={isFormInvalid()}>Sign Up</button>
          <Link to="/">
            <button type="button">Cancel</button>
          </Link>
        </div>

      </form>
    </main>
  );
}

/* --------------------------------Exports--------------------------------*/

export default SignUpForm