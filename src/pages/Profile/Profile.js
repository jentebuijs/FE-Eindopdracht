import './Profile.css'
import React from "react";
import {Link, useParams} from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

function Profile() {
    const {profileId} = useParams();

    return (
        <>
            <Header/>
            <main>
                <p>Profile with id {profileId}</p>
                <Link to="/profiel-bewerken" />
            </main>
            <Footer/>
        </>
    );
}

export default Profile;