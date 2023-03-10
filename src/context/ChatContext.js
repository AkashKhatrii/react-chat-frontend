import { createContext, useState, useEffect, useReducer, useContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUser } from "../utils/getUser";
import { AuthContext } from "./AuthContext";





export const ChatContext = createContext()



export const ChatContextProvider = ({ children }) => {

    const { currentUser } = useContext(AuthContext)

    
   const INITIAL_STATE = {
    chatId: "null",
    user: {}
   }

   const chatReducer = (state, action ) => {
    switch(action.type){
        case "CHANGE_USER":
            return {
                user: action.payload,
                chatId: 
                    currentUser._id > action.payload.uid ?
                    currentUser._id + action.payload.uid
                    : action.payload.uid + currentUser._id
                
            }

        default:
            return state;
    }
   }

   const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

   return(
    <ChatContext.Provider value ={{ data: state, dispatch}}>
        {children}
    </ChatContext.Provider>
   )
}