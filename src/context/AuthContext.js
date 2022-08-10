import {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [ auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        if (token && !isTokenExpired) {
            setAuth({
                isAuth: true,
                user: {
                    username: decodedToken.sub,
                    authorities: decodedToken.authorities,
                },
                status: 'done',
            });
        } else {
            setAuth({
                ...auth,
                status: 'done',
            })
        }
    }, [])

    function isTokenExpired(token) {
        const decodedToken = jwt_decode(token);
        if (decodedToken.exp < Date.now()) {
            return true;
        } return false;
    }

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
        setAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });
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