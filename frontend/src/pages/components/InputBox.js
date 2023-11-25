import { useState } from 'react';

// Create a CSS class for the input box
const inputStyle = {
    backgroundColor: 'rgba(252, 251, 235, 1)',
    borderRadius: '15px',
    border: '2px solid #C4A484',
    padding: '9px 12px',
    boxSizing: 'border-box',
    borderColor: '#C4A484',
    outline: 'none',
    transition: 'border-color 0.1s ease-in-out',
    fontFamily: 'Arial, sans-serif', 
    fontSize: '15px',
    width: '300px', 
};

// Create a CSS class for the input box with blue border on focus
const inputStyleFocus = {
    ...inputStyle,
    borderColor: '#4395e8'
};

// Create the InputBox component
function InputBox(props) {
    const [isFocused, setIsFocused] = useState(false);

    // Render the InputBox component
    return (
        <div>
            <input
                type={props.type || 'text'} 
                value={props.value || ''}
                onChange={props.onChange || (() => {})}
                onBlur={props.onBlur || (() => {})}
                style={isFocused ? inputStyleFocus : inputStyle}
                onFocus={() => setIsFocused(true)}
                placeholder={props.placeholder}
            />
        </div>
    );
}

// Export the InputBox component
export default InputBox;