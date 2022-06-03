import './profile.css'
import React from "react";
import {useParams} from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

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