import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import image from "../assets/App-Logo.png";
import '../App.css';

function LoginScreen() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userName: '',
        password: ''
      });

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        if (user.userName === "admin" && user.password === "123") {
            navigate('/places');
          } else {
            
          }
      };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

  return (
    <div className='login-container'>
       <form className="section">
            <div className="login-form">
              <div className="image-container">
                <img className="image" src={image} alt="Slide 3" />
              </div>
                <div>
                <h1 className="nav-brand">
                    FortRoam    
                </h1>
                <h1 className="sub-title">Admin Dashboard</h1>
                <div>
                  <input
                    className="login-input"
                    onChange={handleChange}
                    value={user.userName}
                    name="userName"
                    placeholder="User Name"
                    autoComplete='off'
                  />
                  <input
                    className="login-input"
                    onChange={handleChange}
                    value={user.password}
                    name="password" 
                    placeholder="Password"
                    autoComplete='off'
                    type="password"
                  />
                </div>
                <button onClick={handleLoginSubmit} type="submit" className="btn">Log In</button>
              </div>
            </div>
          </form>
    </div>
  )
}

export default LoginScreen
