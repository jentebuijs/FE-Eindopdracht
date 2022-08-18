import './Overview.css'
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Header from "../../components/Header/Header";

function Overview() {
    document.title = "DIGITAALBUDDY | Profielenoverzicht";
    const [profiles, setProfiles] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchProfiles() {
            try {
                const response = await axios.get("http://localhost:8080/profiles/", {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }, signal: controller.signal
                });

                setProfiles(response.data);

            } catch (e) {
                console.error(e);
            }
        }

        fetchProfiles();

        return function cleanup() {
            controller.abort();
        }
    }, []);

    return (
        <>
            <Header titel="Profielenoverzicht"/>
            <div className="profile-card-container">
                {profiles && profiles.map((profile) => {
                    return (<ProfileCard key={profile.username} profile={profile}/>);
                })}
            </div>
        </>
    );
}

export default Overview;