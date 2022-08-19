import './UserEdit.css'
import React, {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import {useHistory} from "react-router-dom";
import Button from "../../../components/Button/Button";
import {NotificationManager} from "react-notifications";

function UserEdit() {
    const {user: {username}, logout} = useContext(AuthContext);
    const history = useHistory();

    async function deleteUser() {
        try {
            await axios.delete(`http://localhost:8080/users/${username}`, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            logout();
            history.push("/");

        } catch (e) {
            console.error(e);
            NotificationManager.error('Probeer het opnieuw', 'Er is iets misgegaan!', 1500);
        }
    }

    return (
        <>
            <Button type="button" title="Delete mijn account" onClick={deleteUser} />
        </>
    );
}

export default UserEdit;