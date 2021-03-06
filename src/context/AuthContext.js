import {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

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
        if (token && !isTokenExpired) {
            getUserData(token);
        } else {
            //niks?
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
        getUserData(token);
    }

    function logout() {
        setAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });
    }

    async function getUserData(token) {
        const decodedToken = jwt_decode(token);
        console.log(decodedToken);
        try {
            const response = await axios.get(`http://localhost:8080/users/${decodedToken.sub}`, {
                headers: {
                    "Content-type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);

            setAuth({
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                    enabled: response.data.enabled,
                    is_student: response.data.is_student,
                },
                status: 'done',
            });
            console.log(auth);
        } catch(e) {
            console.error(e);
        }
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