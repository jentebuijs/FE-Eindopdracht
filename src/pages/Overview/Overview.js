import './Overview.css'
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import jwt_decode from "jwt-decode";

function Overview() {
    const { isAuth, user } = useContext(AuthContext);
    const [ profiles, setProfiles ] = useState();

    useEffect(() => {
        async function fetchProfiles() {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:8080/profiles/${user.authority}`, {
                    headers: {
                        "Content-type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(user);
                console.log(response);
                setProfiles(response.data);
            } catch(e) {
                console.error(e);
            }
        }
        fetchProfiles();
    }, []);

    return (
        <>
                <h1>Profielenoverzicht</h1>
                {console.log(profiles)}
            { profiles && profiles.map((profile) => {
                return (<ProfileCard profile={profile}/>);
            })}
        </>
    );
}

export default Overview;