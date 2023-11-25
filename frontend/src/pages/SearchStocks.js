import React, { useState, useEffect } from 'react';
import { useUser } from './components/UserDetails.js';
import { useNavigate } from "react-router-dom";

import InputBox from './components/InputBox.js';
import signInImage from './components/signInImage.png';
import Button from './components/Button.js';

import axios from 'axios';

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
    whole: {
        margin: '0 60px',
    }
};

const buttonContainerStyle = {
    position: 'absolute',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 20px',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    backgroundColor: 'rgba(250, 212, 212, 1)',
    borderRadius: '10px',
    zIndex: 1,
    width: '100%',
};

const buttonStyle = {
    padding: '10px',
    margin: '0 5px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
};

const ButtonContainer = () => {

    const navigate = useNavigate()

    const [isFocused1, setIsFocused1] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [isFocused3, setIsFocused3] = useState(false);
    const [isFocused4, setIsFocused4] = useState(false);

    return (
        <div style={buttonContainerStyle}>
            <button
                style={{
                    ...buttonStyle, // Corrected from styles.buttonStyle
                    backgroundColor: isFocused1 ? '#4395e8' : 'rgba(250, 212, 212, 1)',
                    cursor: 'pointer',
                }}
                onMouseEnter={() => setIsFocused1(true)}
                onMouseLeave={() => setIsFocused1(false)}
                onClick={() => navigate('/')}
            >
                StockMarketAnalyzer App
            </button>
            <button 
                style={{
                    ...buttonStyle, // Corrected from styles.buttonStyle
                    backgroundColor: isFocused2 ? '#4395e8' : 'rgba(250, 212, 212, 1)',
                    cursor: 'pointer',
                }}
                onMouseEnter={() => setIsFocused2(true)}
                onMouseLeave={() => setIsFocused2(false)}
                onClick={() => navigate('/dashboard')}
            >
                User DashBoard
            </button>
            <button
                style={{
                    ...buttonStyle, // Corrected from styles.buttonStyle
                    backgroundColor: isFocused4 ? '#4395e8' : 'rgba(250, 212, 212, 1)',
                    cursor: 'pointer',
                }}
                onMouseEnter={() => setIsFocused4(true)}
                onMouseLeave={() => setIsFocused4(false)}
                onClick={() => navigate('/market-trends')}
            >
                Market Trends
            </button>
            <button 
                style={{
                    ...buttonStyle, // Corrected from styles.buttonStyle
                    backgroundColor: isFocused3 ? '#4395e8' : 'rgba(250, 212, 212, 1)',
                    cursor: 'pointer',
                }}
                onMouseEnter={() => setIsFocused3(true)}
                onMouseLeave={() => setIsFocused3(false)}
                onClick={() => navigate('/sign-in')}
            >
            Log Out
            </button>
            
        </div>
    );
};

const Display = ({Stocks, Stock, setStock}) => {

    const navigate = useNavigate()
    if (Stock === '') {
        return (
            <div>
                <p style={{ fontSize: 18, fontWeight: 'bold', color: 'red' }}> Enter the stock name or ticker symbol to see the results. </p>
            </div>
        );
    }
    if (Stocks.length === 0) {
        return (
            <div>
                <p style={{ fontSize: 18, fontWeight: 'bold', color: 'red' }}> No results found for the given search query. </p>
            </div>
        );
    }
    if (Stocks.length > 50) {
        return (
            <div>
                <p style={{ fontSize: 18, fontWeight: 'bold', color: 'red' }}> Too many results found for the given search query. Please refine your search. </p>
            </div>
        );
    }
    <DynamicTable data={Stocks} />
}

const DynamicTable = ({ data }) => {
    return (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Stock Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Symbol</th>
                    {/* Add more columns as needed */}
                </tr>
            </thead>
            <tbody>
                {data.map((stock, index) => (
                    <tr key={index} style={{ border: '1px solid #ddd' }}>
                        <td style={{ padding: '8px' }}>{stock.instrument_name}</td>
                        <td style={{ padding: '8px' }}>{stock.symbol}</td>
                        {/* Add more cells based on the number of columns */}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

function SearchStocks() {
    
    const [isFocused, setIsFocused] = useState(false);

    let { user } = useUser();

    const navigate = useNavigate()

    // if (!user) {

    //     return (
    //         <div style={styles.container}>

    //             {/* App button */}
    //             <button
    //                 style={{
    //                     ...styles.appButton,
    //                     backgroundColor: isFocused ? '#4395e8' : 'rgba(250, 212, 212, 1)',
    //                     cursor: 'pointer',
    //                 }}
    //                 onMouseEnter={() => setIsFocused(true)}
    //                 onMouseLeave={() => setIsFocused(false)}
    //                 onClick={() => navigate('/')}
    //             >
    //                 StockMarketAnalyzer App
    //             </button>

    //             {/* Left container */}
    //             <div style={styles.left}>
    //                 <div className='w-full h-screen flex items-start'>
    //                     <div className='relative w-full h-full flex flex-col'>
    //                         <img src={signInImage} alt="Sign In" className='w-full h-full object-cover' />
    //                     </div>
    //                 </div>
    //             </div>

    //             {/* Right container */}
    //             <div style={styles.right}>
    //                 <h1 style={{ fontWeight: 'bolder', fontSize: 45 }}>This is Search Stocks Page!</h1>
    //                 <p style={{ marginTop: '10px', fontSize: '1.75rem' }}>Please SignIn to access all the features.</p>
    //                 <br />
    //                 <br />
    //                 <Button label="Sign In Page" onClick={() => navigate('/sign-in')} />
    //                 <p style={styles.copyRight}>© 2023 StockMarketAnalyzer App. All rights reserved.</p>
    //             </div>

    //         </div>
    //     );

    // }

    user = {
        "name": "John Doe",
        "email": "root222@gmail.com",
        "password": "root222",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE2MjU0NjY0NzMsImV4cCI6MT",
        "message": "User logged in successfully"
    }

    const [Stock, setStock] = useState("");
    console.log(Stock);

    const [Stocks, setStocks] = useState([]);

    useEffect(() => {
        console.log("useEffect called");
        axios.get(`https://api.twelvedata.com/symbol_search?symbol=${Stock}&outputsize=51&source=docs`).then(response => {
            setStocks(response.data.data);
        });
    }, [Stock]);

    console.log(Stocks);

    return (
        <div style={styles.whole}>
            <ButtonContainer />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1 style={{ fontWeight: 'bolder', fontSize: 30, textAlign: 'center', margin: '0 60px'}}>Hi {user.name}! This is the Search Stocks Page. </h1>
            <br />
            <p style={{fontSize: 18 }}> The StockMarketAnalyzer App enables you to explore stocks of interest and access detailed information about them. You can search for stocks by their name or ticker symbol. Each time you input a search query, the app will present the top 25 results based on your search criteria. Clicking on any of the displayed results allows you to view comprehensive details for that specific stock. In cases where there are more than 25 results, the app will prompt you to refine your search. If no results match your search, the app will inform you that there are no matches. Additionally, searching for a specific stock directly will promptly display the detailed information for that particular stock. </p>
            <br />
            <p style={{ fontSize: 18 }}> The App also records the user's search history, leveraging it to suggest similar stocks for the user's consideration. These personalized recommendations can be accessed within the Dashboard. Within the Dashboard, users have the option to view or clear their search history. </p>
            <br />
            <p style={{ fontSize: 18, fontWeight: 'bold'}}>
                Enter the name or ticker symbol of the stock you want to search for --
            </p>

            <InputBox 
                placeholder="Enter the Stock name or ticker value"
                value={Stock}
                onChange={e => setStock(e.target.value)}
            />
            

            <br />
            <Display Stocks={Stocks} Stock={Stock} setStock={setStock} />

            


        </div>

    );

}

export default SearchStocks;
