import React, { useState } from 'react';
import {useUser} from './components/UserDetails.js';
import { useNavigate } from "react-router-dom";

import signInImage from './components/signInImage.png';
import Button from './components/Button.js';        

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

const Dashboard = () => {

    const [isFocused, setIsFocused] = useState(false);

    const { user } = useUser();

    const navigate = useNavigate()

    if (!user) {

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
                    onClick={() => navigate('/')}
                >
                    StockMarketAnalyzer App
                </button>

                {/* Left container */}
                <div style={styles.left}>
                    <div className='w-full h-screen flex items-start'>
                        <div className='relative w-full h-full flex flex-col'>
                            <img src={signInImage} alt="Sign In" className='w-full h-full object-cover' />
                        </div>
                    </div>
                </div>

                {/* Right container */}
                <div style={styles.right}>
                    <h1 style={{ fontWeight: 'bolder', fontSize: 45 }}>This is User Dashboard!</h1>
                    <p style={{ marginTop: '10px', fontSize: '1.75rem' }}>Please SignIn to access all the features.</p>
                    <br />
                    <br />
                    <Button label="Sign In Page" onClick={() => navigate('/sign-in')} />
                    <p style={styles.copyRight}>© 2023 StockMarketAnalyzer App. All rights reserved.</p>
                </div>

            </div>
        );

    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome {user.name}!</p>
        </div>
        
    );

};

export default Dashboard;