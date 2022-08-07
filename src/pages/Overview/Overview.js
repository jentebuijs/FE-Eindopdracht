import './Overview.css'
import React, {useContext, useEffect, useState} from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import jwt_decode from "jwt-decode";

function Overview() {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const [ profiles, setProfiles ] = useState();

    useEffect(() => {
        async function fetchProfiles() {
            const decodedToken = jwt_decode(token);
            console.log(decodedToken);
            // try {
            //     const response = await axios.get(`http://localhost:8080/profiles/${}`, {
            //         headers: {
            //             "Content-type" : "application/json",
            //             Authorization: `Bearer ${token}`
            //         }
            //     });
            //     console.log(response);
            //     setProfiles(response.data);
            // } catch(e) {
            //     console.error(e);
            // }
        }
    }, []);

    function getUserRole(is_student) {
        if(is_student === true) {
            return `buddies`;
        } return `students`;
    }


    return (
        <>
            <Header/>
            <main>
                <h1>Profielenoverzicht</h1>
                {profiles && profiles.map((profile) => {
                    return (<ProfileCard profile={profile} />);
                })}
            </main>
            <Footer/>
        </>
    );
}

export default Overview;