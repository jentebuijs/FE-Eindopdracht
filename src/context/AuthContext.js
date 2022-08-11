import {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
import isTokenValid from "../components/helpers/isTokenValid";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const history = useHistory();
    const [ auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        console.log("useeffect wordt geladen");
        const token = localStorage.getItem('token');
        if (token && isTokenValid(token)) {
            const decodedToken = jwt_decode(token);
            setAuth({
                isAuth: true,
                user: {
                    username: decodedToken.sub,
                    authorities: decodedToken.authorities,
                },
                status: 'done',
            });
            console.log("dit gaat goed");
        } else {
            setAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
            console.log("dit gaat fout");
        }
    }, [])

    function login(token) {
        console.log(token);
        localStorage.setItem('token', token);
        const decodedToken = jwt_decode(token);
        setAuth({
            isAuth: true,
            user: {
                username: decodedToken.sub,
                authorities: decodedToken.authorities,
            },
            status: 'done',
        });
        history.push("/");
    }

    function logout() {
        localStorage.removeItem('token');
        setAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });
        history.push("/inloggen");
    }

    const contextData = {
        isAuth : auth.isAuth,
        user : auth.user,
        status: auth.status,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={ contextData }>
            { auth.status === 'done' ? children : <p>Loading...</p> }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;