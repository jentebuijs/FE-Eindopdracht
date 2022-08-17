import {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
import isTokenValid from "../components/Helpers/isTokenValid";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const history = useHistory();
    const [auth, setAuth] = useState({
        isAuth: false,
        user: {
            username: null,
            authorities: null
        },
        status: 'pending',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token && isTokenValid(token)) {
            const decodedToken = jwt_decode(token);
            setAuth({
                isAuth: true,
                user: {
                    username: decodedToken.sub,
                    authorities: Object.values(decodedToken.authorities).map((value) => {
                        return value.authority;
                    })
                },
                status: 'done',
            });

        } else {
            setAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, [])

    function login(token) {
        localStorage.setItem('token', token);
        const decodedToken = jwt_decode(token);
        setAuth({
            isAuth: true,
            user: {
                username: decodedToken.sub,
                authorities: Object.values(decodedToken.authorities).map((value) => {
                    return value.authority;
                })
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
        history.push("/");
    }

    const contextData = {
        isAuth: auth.isAuth,
        user: auth.user,
        status: auth.status,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;