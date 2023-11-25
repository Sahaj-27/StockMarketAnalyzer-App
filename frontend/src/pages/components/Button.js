import React, { useState } from 'react';

// Create a CSS class for the button
const buttonStyle = {
    backgroundColor: '#66afe9',
    border: 'none',
    color: 'white',
    padding: '10px',
    width: '300px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '8px',
    outline: 'none',
    transition: 'background-color 0.3s ease-in-out',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold'
};

// Create a CSS class for the button with blue background on hover
const buttonStyleHover = {
    ...buttonStyle,
    backgroundColor: '#4395e8'
};

// Create the Button component
function Button(props) {
    const [isHovered, setIsHovered] = useState(false);

    // Handle mouse enter event
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    // Handle mouse leave event
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <button
            style={isHovered ? buttonStyleHover : buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={props.onClick}
        >
            {props.label}
        </button>
    );
}

export default Button;