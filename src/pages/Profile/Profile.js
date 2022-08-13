import './Profile.css'
import {FaRegEdit, FaPhotoVideo, FaUserEdit, FaRegEnvelope} from "react-icons/fa";
import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Button from "../../components/Button/Button";
import PhotoEdit from "../../components/PhotoEdit/PhotoEdit";
import RequestSection from "../../components/RequestSection/RequestSection";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";
import UserEdit from "../../components/UserEdit/UserEdit";

function Profile() {
    const token = localStorage.getItem('token');
    const {user} = useContext(AuthContext);
    const [profileEdit, toggleProfileEdit] = useState(false);
    const [userEdit, toggleUserEdit] = useState(false);
    const [fileUpload, toggleFileUpload] = useState(false);
    const [newRequest, toggleNewRequest] = useState(false);
    const [profile, setProfile] = useState({});


    useEffect(() => {
        const controller = new AbortController;

        async function fetchProfile() {
            try {
                const response = await axios.get(`http://localhost:8080/profiles/${user.username}`, {
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
            {profileEdit && <ProfileEdit profileData={profile}/>}
            {fileUpload && <PhotoEdit/>}
            {userEdit && <UserEdit/>}
            {profile && <section>
                <div>
                    { profile.username === user.username &&
                    <h2>Hallo, {user.username}!</h2> }
                    <p>Naam: {profile.firstName} {profile.lastName}</p>
                    <p>Leeftijd: {profile.age}</p>
                    <p>Profielinformatie blablabla</p>
                </div>
                <div>
                    <FaUserEdit onClick={() => toggleUserEdit(!userEdit)}/>
                    <FaRegEdit onClick={() => toggleProfileEdit(!profileEdit)}/>
                    <FaPhotoVideo onClick={() => toggleFileUpload(!fileUpload)}/>
                    {/*<img src={profile.fileUploadResponse.url} alt="profielfoto" />*/}
                    {profile.username !== user.username &&
                        <FaRegEnvelope onClick={() => toggleNewRequest(!newRequest)}/> }
                </div>
            </section>}
            <RequestSection/>
        </>
    );
}

export default Profile;