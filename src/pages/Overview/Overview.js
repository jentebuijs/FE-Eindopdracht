import './Overview.css'
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import ProfileCard from "./ProfileCard/ProfileCard";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import {AuthContext} from "../../context/AuthContext";
import {NotificationManager} from "react-notifications";

function Overview() {
    const {user} = useContext(AuthContext);
    document.title = "DIGITAALBUDDY | Profielenoverzicht";
    const [profiles, setProfiles] = useState([]);
    const [cancelled, toggleCancelled] = useState(false);
    let sortedProfiles = [];

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
                toggleCancelled(true);
                console.error(e);
                NotificationManager.error('Probeer het opnieuw', 'Er is iets misgegaan!', 1500);
            }
        }

        fetchProfiles();

        return function cleanup() {
            if (cancelled) {
                controller.abort();
            }
        }
    }, []);

    function sortOnFrequency() {
        sortedProfiles = profiles.sort((a, b) => {
            return (a.frequency.score - b.frequency.score);
        });
        setProfiles([...sortedProfiles]);
    }

    function sortOnLevel() {
        sortedProfiles = profiles.sort((a, b) => {
            return (a.level.score - b.level.score);
        });
        setProfiles([...sortedProfiles]);
    }

    return (
        <>
            <Header titel="Profielenoverzicht"/>
            <div className="sortingbuttons">
                <Button type="button"
                        title="Sorteer op contactvoorkeur"
                        onClick={() => sortOnFrequency()}/>

                {user.authorities !== "ROLE_STUDENT" &&
                    <Button type="button"
                            title="Sorteer op level"
                            onClick={() => sortOnLevel()}/>}
            </div>
            <div className="profile-card-container">
                {profiles && profiles.map((profile) => {
                    return (<ProfileCard key={profile.username} profile={profile}/>);
                })}
            </div>
        </>
    );
}

export default Overview;