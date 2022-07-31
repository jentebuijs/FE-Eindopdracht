import './Profile.css'
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";

function Profile() {
    const token = localStorage.getItem('token');
    const { profileId } = useParams();
    const [ profile, setProfile ] = useState({});

    useEffect(() => {
        async function fetchProfile(profileId) {
            try {
                const response = await axios.get(`http://localhost:8080/profiles/${profileId}`, {
                    headers: {
                        "Content-type" : "application/json",
                        Authorization : `Bearer ${token}`
                    }
                });
                console.log(response);
            } catch(e) {
                console.error(e);
            }
        }
    }, []);

    return (
        <>
            <Header/>
            <main>
                <p>Profile with id {profileId}</p>
                <Link to="/profiel/bewerken">Profiel bewerken</Link>
            </main>
            <Footer/>
        </>
    );
}

export default Profile;