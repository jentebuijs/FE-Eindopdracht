import {createContext, useState} from "react";
import {useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [ auth, setAuth] = useState({
        isAuth: false,
        user: null
    });
    const history = useHistory();

    function login(token) {
        console.log(token);
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        localStorage.setItem('JWT-token', token);
        setAuth({
            isAuth: true,
            user: {
                username: decodedToken.sub,
                banaan: 'geel'
            }});
        console.log(auth);
        // history.push('/')
    }

    function logout() {
        setAuth({
            isAuth: false,
            user: null,
        })
    }

    const authData = {
        isAuth : auth.isAuth,
        user : auth.user,
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