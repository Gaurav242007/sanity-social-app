import {useState, useContext, createContext, useEffect} from 'react';

export const StateContext = createContext();

export const StateProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <StateContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);