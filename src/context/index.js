"use client"
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext()

export function AppWrapper({ children }) {

    const [user, setUser] = useState()


    useEffect(() => {
        console.log(user == undefined)
        if (user == undefined) {
            const userDetails = localStorage.getItem("PortFolioUser")
            const parsedUserDetails = JSON.parse(userDetails);
            setUser(parsedUserDetails)
        }
    }, [user])

    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext)
}