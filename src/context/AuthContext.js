import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext()


export const AuthContextProvider =  ({ children }) => {

    const [ currentUser, setCurrentUser ] = useState({})
    const [ isLogged, setIsLogged ] = useState(false)


    useEffect(() => {
        axios.get('https://react-chat-backend.onrender.com/getuser', { withCredentials: true })
    .then(res => {
        console.log("auth", res)
        setCurrentUser(res.data.data.user)
    }).catch(err => console.log(err))
    }, [isLogged]);

    return(
    <AuthContext.Provider value={{ currentUser, setIsLogged}}>
        { children}
    </AuthContext.Provider>
    )
    
}