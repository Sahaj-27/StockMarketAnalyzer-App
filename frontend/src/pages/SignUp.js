import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import signInImage from './components/signInImage.png'
import Button from './components/Button.js';
import InputBox from './components/InputBox.js';

import {create} from './services/users.js';

// Create a CSS class for the container, left and right divs
const styles = {
    container2: {
        display: 'flex',
        flexDirection: 'row',
        height: '40px'
    },
    container1: {
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
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '0.9rem',
        color: '#444444',
        paddingBottom: '20px',
    },
};

// Create the SignUp component
function TopButton(props) {
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();
    return (
        <div style={styles.container2}>
            <button
                style={isFocused ? { ...styles.appButton, backgroundColor: '#4395e8', cursor: 'pointer' } : styles.appButton}
                onMouseEnter={() => setIsFocused(true)}
                onMouseLeave={() => setIsFocused(false)}
                onClick={() => navigate("/")}
            >StockMarketAnalyzer App</button>
        </div>
    );
}

function SignUp(props) {

    const navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    // Function to validate name input
    const validateName = () => {
        if (name.trim() === "") {
            return "Name is required";
        } else if (!/^[a-zA-Z\s]*$/.test(name)) {
            return "Name should only contain alphabets and spaces";
        } else if (name.length < 3) {
            return "Name should be at least 3 characters long";
        } else {
            return "";
        }
    };

    // Function to validate email input
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (email.trim() === "") {
            return "Email is required";
        } else if (!emailRegex.test(email)) {
            return "Invalid email format";
        } else {
            return "";
        }
    };

    // Function to validate password input
    const validatePassword = () => {
        if (password.trim() === "") {
            return "Password is required";
        } else if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password)) {
            return "It must have min. 8 chars, with at least 1 number and 1 letter";
        } else {
            return "";
        }
    };

    // Function to validate confirm password input
    const validateConfirmPassword = () => {
        if (confirmPassword.trim() === "") {
            return "Confirm password is required";
        } else if (password !== confirmPassword) {
            return "Passwords do not match";
        } else {
            return "";
        }
    };

    // Event handlers for form inputs
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate form inputs
        const nameError = validateName();
        const emailError = validateEmail();
        const passwordError = validatePassword();
        const confirmPasswordError = validateConfirmPassword();

        // Set errors in state
        setNameError(nameError);
        setEmailError(emailError);
        setPasswordError(passwordError);
        setConfirmPasswordError(confirmPasswordError);

        // Submit form if there are no errors
        if (!nameError && !emailError && !passwordError && !confirmPasswordError) {
            const userObject = {
                name: name,
                email: email,
                password: password,
            };
            create(userObject).then((response) => {
                console.log(response);
                if (response === "email must be unique") {
                    setEmailError("Email already exists");
                }
                else {
                    console.log(response.data);
                    alert("User created successfully!");
                    setName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    navigate("/sign-in");
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    return (
        <>
            <TopButton />
            <br /><br /><br /><br />
            <div style={styles.container1}>
                <div style={styles.left}>
                    <div className='w-full h-screen flex items-start'>
                        <div className='relative w-full h-full flex flex-col'>
                            <img src={signInImage} alt="Sign In" className='w-full h-full object-cover' />
                        </div>
                    </div>
                </div>
                <div style={styles.right}>
                    <h1 style={{ fontWeight: 'bolder', fontSize: 45 }}>Welcome to STOCK APP!</h1>
                    <p style={{ marginTop: '10px', fontSize: '1.2rem' }}>Enter your Name, Email ID and Password to Sign Up</p>
                    <br /><br />
                    <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Name {nameError && <span style={{ color: "red", fontWeight: 'normal', fontSize: '1rem'}}>({nameError})</span>} </p>
                    <InputBox placeholder="Enter your Name" value={name} onChange={handleNameChange} onBlur={validateName} />
                    <br />
                    <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Email {emailError && <span style={{ color: "red", fontWeight: 'normal', fontSize: '1rem' }}>({emailError})</span>} </p>
                    <InputBox placeholder="Enter your Email ID" value={email} onChange={handleEmailChange} onBlur={validateEmail} />
                    <br />
                    <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Password {passwordError && <span style={{ color: "red", fontWeight: 'normal', fontSize: '1rem' }}>({passwordError})</span>} </p>
                    <InputBox type="password" placeholder="Create your Password" value={password} onChange={handlePasswordChange} onBlur={validatePassword} />
                    <br />
                    <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Confirm Password {confirmPasswordError && <span style={{ color: "red", fontWeight: 'normal', fontSize: '1rem' }}>({confirmPasswordError})</span>} </p>
                    <InputBox type="password" placeholder="Confirm your Password" value={confirmPassword} onChange={handleConfirmPasswordChange} onBlur={validateConfirmPassword} />
                    <br /><br />
                    <Button label="Sign Up" onClick={handleSubmit} />
                    <br />
                    <p style={{ fontSize: '1.1rem', color: '#444444', paddingLeft: '17.5px' }}>
                        Already have an account? <a href="/sign-in" style={{ fontWeight: 'bold', color: '#3d2c1d' }}>Sign In</a>
                    </p>
                </div>
            </div>
            <br /><br />
            <div style={styles.container2}>
                <p style={styles.copyRight}>© 2023 StockMarketAnalyzer App. All rights reserved.</p>
            </div>
        </>
    );
};

// Export the SignUp component
export default SignUp;