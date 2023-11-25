import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {UserProvider} from './pages/components/UserDetails.js';

import './App.css';

import SignIn from './pages/SignIn.js';
import SignUp from './pages/SignUp.js';
import Welcome from './pages/Welcome.js';
import Dashboard from './pages/Dashboard.js';
import SearchStocks from './pages/SearchStocks.js';

function App() {
    return (
    	<div className="App">
            <Router>
                <UserProvider>
                    <Routes>
                        <Route exact path="/" element={<Welcome />} />
                        <Route path="/sign-in" element={<SignIn />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/search-stocks" element={<SearchStocks />} />
                    </Routes>
                </UserProvider>
            </Router>

    	</div>
    );
}

export default App;