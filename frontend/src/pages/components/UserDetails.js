import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const log_in = (userData) => {
        setUser(userData);
        setToken(userData.token);
    };

    const log_out = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, token, log_in, log_out }}>
            {children}
        </UserContext.Provider>
    );

};

export {useUser, UserProvider};