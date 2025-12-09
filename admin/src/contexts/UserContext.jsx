import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react'
import { authDataContext } from './AuthContext';
import axios from 'axios';
import { useEffect } from 'react';

export const adminDataContext = createContext();
const UserContext = ({children}) => {

    let[adminData,setAdminData]  = useState(null);
    let {server_url} = useContext(authDataContext);

    const  getAdmin  =  async(e) => {
        try {
            let result  =  await axios.post(`${server_url}/api/user/get_current_admin`,
                {},
                {withCredentials :true}
            )
            setAdminData(result.data);
            console.log(result.data)
        } catch (error) {
            setAdminData(null);
            console.log(error)
        }
    }

    useEffect(() => {
        getAdmin();
    },[])

    let value = {
        adminData,setAdminData,getAdmin
    }

    return (
        <adminDataContext.Provider value={value}>
            {children}
        </adminDataContext.Provider>
    )
}

export default UserContext
