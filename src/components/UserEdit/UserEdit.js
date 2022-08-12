import './UserEdit.css'
import React, {useContext, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import authContext from "../../context/AuthContext";

function UserEdit() {
    const {user: {username}} = useContext(authContext);
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="true">Actief</label>
            <input type="radio"
                   id="true"
                   name="enabled"
                   value="true"
                   {...register("enabled", { required: true })}
            />
            <label htmlFor="false">Inactief</label>
            <input type="radio"
                   id="false"
                   name="enabled"
                   value="false"
                   {...register("enabled", { required: true })}/>
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
        </form>);
}

export default UserEdit;