import React, {useState} from 'react';
import './Auth.css';
import helpHubLogo from '../../assets/HelpHub_Logo.jpg'

function Authentication(){

    const [isLogin, setLogin] = useState();

    return (
      <div className="auth-container">
        <img className="logo" src={helpHubLogo} alt="HelpHub" />
        <div className="box">
          <h1 className="heading-Style">
            Welcome to HelpHub!
            <p className="para-style">
              Your one-stop place to get support and solutions. Log in to manage
              your requests or sign up to get started.
            </p>
          </h1>
        </div>

        <div className="container">
          <div className="form-container">
            <div className="buttons">
              <button
                className={isLogin ? "active" : ""}
                onClick={() => setLogin(true)}
              >
                Login
              </button>
              <button
                className={!isLogin ? "active" : ""}
                onClick={() => setLogin(false)}
              >
                Sign Up
              </button>
            </div>
            {isLogin ? (
              <>
                <div className="form">
                  <h2>Login Form</h2>
                  <input type="email" placeholder="Email" />
                  <input type="password" placeholder="Password" />
                  <a href="#">Forgot Password</a>
                  <button>Login</button>
                  <p>
                    Not a Member?
                    <a href="#" onClick={() => setLogin(false)}>
                      {" "}
                      Sign Up Now
                    </a>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="form">
                  <h2>Sign Up Form</h2>
                  <input type="email" placeholder="Email" />
                  <input type="password" placeholder="Password" />
                  <input type="password" placeholder="Confirm Password" />
                  <button>Sign Up</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
}

export default Authentication;