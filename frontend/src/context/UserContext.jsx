import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react'
import { authDataContext } from './AuthContext';
import axios from 'axios';

export const userDataContext  =  createContext();
function UserContext({children}){

    const [userData,setUserData]  = useState("");
    let serverURL  = useContext(authDataContext);
    serverURL  = serverURL.server_url
    const getCurrentUser   = async(e) => {
        
        try {
            let result  =  await axios.post(
                `${serverURL}/api/user/get_current_user`,
                {},
                {withCredentials : true}
            )
            setUserData(result.data);
            // console.log(result.data)

        } catch (error) {
            setUserData(null);
            console.log(error)
        }
    }
    useEffect(() => {
        getCurrentUser()
    },[])

    let value = {
        userData,setUserData,getCurrentUser
    }

    return (
        <div>
            <userDataContext.Provider value={value}>
                {children}
            </userDataContext.Provider>
        </div>
    )
}

export default UserContext
