import './UserEdit.css'
import React, {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";

function UserEdit() {
    const history = useHistory();
    const { user: {username}, logout } = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [success, toggleSuccess] = useState();

    async function onSubmit(data) {
        try {
            const response = await axios.put(`http://localhost:8080/users/${username}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                Authorization: `Bearer ${token}`
            });
            console.log(response);
            toggleSuccess(true);
        } catch(e) {
            toggleSuccess(false);
            console.error(e);
        }
    }

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
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <>
            {success && <p>Uw wijzigingen zijn opgeslagen</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="radio"
                   id="true"
                   name="enabled"
                   value="true"
                   {...register("enabled", { required: true })}
            />
            <label htmlFor="true">Actief</label>
            <input type="radio"
                   id="false"
                   name="enabled"
                   value="false"
                   {...register("enabled", { required: true })}/>
            <label htmlFor="false">Inactief</label>
        <br/>
            <label htmlFor="email">Emailadres:</label>
            <input
                type="text"
                id="email"
                {...register("email", {
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Dit is geen juist emailadres",
                    }
                })}
            />
            <br/>
            {errors.email && errors.email.message}
            <button type="submit">Opslaan</button>
        </form>
            <button type="button" onClick={deleteUser}>Delete mijn account</button>
            </>
            );
}

export default UserEdit;