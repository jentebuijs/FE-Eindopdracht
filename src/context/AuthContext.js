import {createContext} from "react";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const contextData = {};

    return (
        <AuthContext.Provider value={ contextData }>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;