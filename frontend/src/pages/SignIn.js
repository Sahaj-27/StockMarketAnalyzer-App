import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {useUser} from './components/UserDetails.js';

import signInImage from './components/signInImage.png'
import Button from './components/Button.js';
import InputBox from './components/InputBox.js';
import { login } from './services/SignIn.js';

// Create a CSS class for the container, left and right divs
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
    },
    left: {
        flex: '0 0 52.5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    right: {
        flex: '0 0 47.5%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '100px',
    },
    appButton: {
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '10px 20px',
        fontSize: '1.4rem',
        fontWeight: 'bold',
        backgroundColor: 'rgba(250, 212, 212, 1)',
        borderRadius: '10px',
        cursor: 'pointer',
        zIndex: 1,
        width: '100%',
    },
    copyRight: {
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '0.9rem',
        color: '#444444',
    },
};

// Create the SignIn component
function SignIn(props) {
    
    const [isFocused, setIsFocused] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const { log_in } = useUser();

    // Function to validate email input
    const validateEmail = () => {
        if (email.trim() === "") {
            return "Email is required";
        }
    }

    // Function to validate password input
    const validatePassword = () => {
        if (password.trim() === "") {
            return "Password is required";
        }
    }

    // Event handlers for form inputs
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form inputs
        const emailError = validateEmail();
        const passwordError = validatePassword();

        // Set errors in state
        setEmailError(emailError);
        setPasswordError(passwordError);

        // Submit form if there are no errors
        if (!emailError && !passwordError) {
            try {
                const user = await login({
                    email, password,
                })
                console.log(user)
                window.localStorage.setItem(
                    'loggedStockAppUser', JSON.stringify(user)
                ) 
                log_in(user)
                setEmail('')
                setPassword('')
                navigate('/dashboard')
            } catch (exception) {
                setEmailError('Wrong credentials')
                setPasswordError('Wrong credentials')
                console.log(exception)
            }
        }
    };

    const navigate = useNavigate()

    return (
        <div style={styles.container}>
            {/* App button */}
            <button
                style={{
                    ...styles.appButton,
                    backgroundColor: isFocused ? '#4395e8' : 'rgba(250, 212, 212, 1)',
                    cursor: 'pointer',
                }}
                onMouseEnter={() => setIsFocused(true)}
                onMouseLeave={() => setIsFocused(false)}
                onClick = {() => navigate('/')}
            >
                StockMarketAnalyzer App
            </button>

            {/* Left container */}
            <div style={styles.left}>
                <div className='w-full h-screen flex items-start'>
                    <div className='relative w-full h-full flex flex-col'>
                        <img src={signInImage} alt="Sign In" className='w-full h-full object-cover'/>
                    </div>
                </div>
            </div>

            {/* Right container */}
            <div style={styles.right}>
                <h1 style={{ fontWeight: 'bolder', fontSize: 45 }}>Welcome Back!</h1>
                <p style={{ marginTop: '10px', fontSize: '1.2rem' }}>Enter your Email ID and Password to Sign In</p>
                <br />
                <br />
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Email {emailError && <span style={{ color: "red", fontWeight: 'normal', fontSize: '1rem' }}>({emailError})</span>} </p>
                <InputBox placeholder="Enter your Email ID" value={email} onChange={handleEmailChange} onBlur={validateEmail}  />
                <br />
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Password {passwordError && <span style={{ color: "red", fontWeight: 'normal', fontSize: '1rem' }}>({passwordError})</span>} </p>
                <InputBox type="password" placeholder="Enter your Password" value={password} onChange={handlePasswordChange} onBlur={validatePassword} />
                <br />
                <br />
                <Button label="Sign In" onClick={handleSubmit} />
                <br />
                <p style={{ fontSize: '1.1rem', color: '#444444', paddingLeft: '22.5px' }}>
                    Don't have an account? <a href="/sign-up" style={{ fontWeight: 'bold', color: '#3d2c1d' }}>Sign Up</a>
                </p>
                <p style={styles.copyRight}>© 2023 StockMarketAnalyzer App. All rights reserved.</p>
            </div>
        </div>
    );
}

// Export the SignIn component
export default SignIn;