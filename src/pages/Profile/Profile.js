import './Profile.css'
import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

function Profile() {
    const token = localStorage.getItem('token');
    const {user: {id, username}} = useContext(AuthContext);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const controller = new AbortController;

        async function fetchProfile() {
            try {
                const response = await axios.get(`http://localhost:8080/profiles/${username}`, {
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
            <h2>Profiel met id {id}</h2>
            <p>{profile}</p>
            <Link to='/profiel/:username/bewerken'>Profiel bewerken</Link>
        </>
);
}

export default Profile;