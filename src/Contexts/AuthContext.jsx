import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null)
    const [isInitialized, setIsInitialized] = useState(true)

    useEffect(()=>{
        const xdata = localStorage.getItem('theUserData')
        if (xdata) {
            setUserInfo(JSON.parse(xdata))
            setIsInitialized(false)
        } else {
            setIsInitialized(false)
        }
    }, [])
        
  return (
    <AuthContext.Provider value={ {userInfo, setUserInfo, isInitialized} }>
        { children }
    </AuthContext.Provider>
  )
}
