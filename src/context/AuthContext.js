import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext()


export const AuthContextProvider =  ({ children }) => {

    const [ currentUser, setCurrentUser ] = useState({})


    useEffect(() => {
        axios.get('https://react-chat-backend.onrender.com/getUser', { withCredentials: true })
    .then(res => {
        setCurrentUser(res.data.data.user)
    }).catch(err => console.log(err))
    }, []);

    return(
    <AuthContext.Provider value={{ currentUser}}>
        { children}
    </AuthContext.Provider>
    )
    
}