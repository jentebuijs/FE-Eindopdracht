import './Overview.css'
import React, {useContext, useEffect, useState} from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

function Overview() {
    const { user: {is_student}} = useContext(AuthContext);
    const [ profiles, setProfiles ] = useState();

    const token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchProfiles(is_student) {
            const oppositeType = getUserRole(is_student);
            try {
                const response = await axios.get(`http://localhost:8080/profiles/${oppositeType}`, {
                    headers: {
                        "Content-type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfiles(response.data);
            } catch(e) {
                console.error(e);
            }
        }
    }, []);

    function getUserRole(is_student) {
        if(is_student == true) {
            const oppositeType = "buddy";
        } const oppositeType = "student";
    }


    return (
        <>
            <Header/>
            <main>
                <h1>Profielenoverzicht</h1>
                {profiles && profiles.map((profile) => {
                    <h2>{profile}</h2>
                })}
            </main>
            <Footer/>
        </>
    );
}

export default Overview;