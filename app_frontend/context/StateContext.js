import {useState, useContext, createContext, useEffect} from 'react';
import {userQuery} from '../utils/queries';

export const StateContext = createContext();

export const StateProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
         localStorage.getItem('user') !== 'undefined' ? setUser(JSON.parse(localStorage.getItem('user'))) : localStorage.clear();
    }, [])

    useEffect(() => {
        if(user)  {
        const query = userQuery(user?.uid);
    
        client.fetch(query).then((data) => {
          setUser(data[0]);
        })
    }
      }, [user]);

    return (
        <StateContext.Provider value={{user, setUser, loading, setLoading}}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);