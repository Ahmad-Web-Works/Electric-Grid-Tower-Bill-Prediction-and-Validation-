import React from 'react';
import '../StyleSheet/SigninPage.css' // Make sure to import your CSS file
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
// import Dashboard from './Dashboard';

const LoginComponent = () => {
    const navigate = useNavigate(); // Initialize history using useHistory hook

    const handleSignIn = () => {
        // Navigate to Dashboard when Sign in button is clicked
        navigate('/Dashboard'); // Use history.push to navigate
    };

    return (

        <div className="home-img">
            <div>
                <Helmet>
                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
                    />
                </Helmet>
            </div>
            <div className="main">
                <img src="./Images/Jazz-logo.png" alt="" />
                <div className="loginForm">
                    <div className="formHeader">
                        <p>WELCOME</p>
                    </div>

                    <div className="formBody">
                        <div className="loginIcon">
                            <img src="/Images/LoginIcon.png" alt="LoginIcon" />
                        </div>

                        <div className="loginDetails">
                            <div className="inputDetails">
                                <div className="usernameLogo">
                                    <img src="./Images/LoginIcon.png" alt="" />
                                </div>
                                <div className="inputUsername">
                                    <input type="text" placeholder="Enter Username" />
                                </div>
                            </div>

                            <div className="inputDetails">
                                <div className="usernameLogo">
                                    <img src="./Images/security.png" alt="" />
                                </div>
                                <div className="inputPassword">
                                    <input type="text" placeholder="Enter Password" />
                                </div>
                            </div>
                        </div>

                        <div className="btnLogin">
                            <button onClick={handleSignIn}>  Sign in</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
