import './Profile.css'
import React from "react";
import {useParams} from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function Profile() {
    const {profileId} = useParams();

    return (
        <>
            <Header/>
            <main>
                <p>Profile with id {profileId}</p>
            </main>
            <Footer/>
        </>
    );
}

export default Profile;