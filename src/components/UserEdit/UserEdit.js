import './UserEdit.css'
import React, {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";

function UserEdit() {
    const history = useHistory();
    const {user: {username}, logout} = useContext(AuthContext);
    const token = localStorage.getItem('token');

    async function deleteUser() {
        try {
            const response = await axios.delete(`http://localhost:8080/users/${username}`, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                Authorization: `Bearer ${token}`
            });
            console.log(response);
            logout();
            history.push("/");
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <button type="button" onClick={deleteUser}>Delete mijn account</button>
        </>
    );
}

export default UserEdit;