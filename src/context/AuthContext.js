import {createContext, useState} from "react";
import {useHistory} from "react-router-dom";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [ auth, toggleAuth ] = useState({
        isAuth: false,
        user: null
    });
    const history = useHistory();

    function login() {
        toggleAuth({
            isAuth: true,
            user: null,
        });
        history.push('/')
    }

    function logout() {
        toggleAuth({
            isAuth: false,
            user: null,
        })
        history.push('/')
    }

    const authData = {
        auth : auth,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={ authData }>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;