import './Profile.css'
import { FaRegEdit } from "react-icons/fa";
import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import ProfileChange from "../ProfileChange/ProfileChange";
import Button from "../../components/Button/Button";

function Profile() {
    const token = localStorage.getItem('token');
    const {user} = useContext(AuthContext);
    const [edit, toggleEdit] = useState(false);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const controller = new AbortController;

        async function fetchProfile() {
            try {
                const response = await axios.get(`http://localhost:8080/profiles/${user.username}`, {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }, signal: controller.signal
                });
                console.log(response);
                setProfile(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchProfile();
        return function cleanup() {
            controller.abort();
        }
    }, []);

    return (
        <>
            <h2>Profiel met id {user.id}</h2>
            <button type="button" onClick={() => toggleEdit(!edit)}><FaRegEdit/></button>
            { edit && <ProfileChange profileData={profile}/> }
        </>
);
}

export default Profile;