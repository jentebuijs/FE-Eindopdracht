import './Profile.css'
import {FaRegEdit, FaPhotoVideo, FaUserEdit} from "react-icons/fa";
import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import Button from "../../components/Button/Button";
import FileUpload from "../../components/FileUpload/FileUpload";
import Requests from "../../components/Requests/Requests";

function Profile() {
    const token = localStorage.getItem('token');
    const {user} = useContext(AuthContext);
    const [profileEdit, toggleProfileEdit] = useState(false);
    const [userEdit, toggleUserEdit] = useState(false);
    const [fileUpload, toggleFileUpload] = useState(false);
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
            {fileUpload && <FileUpload/>}
            {profile && <section>
                <div>
                    <h2>Hallo, {user.username}!</h2>
                    <p>Naam: {profile.firstName} {profile.lastName}</p>
                    <p>Profielinformatie blablabla</p>
                </div>
                <div>
                    <button type="button" onClick={() => toggleUserEdit(!userEdit)}><FaUserEdit/></button>
                    <button type="button" onClick={() => toggleProfileEdit(!profileEdit)}><FaRegEdit/></button>
                    <button type="button" onClick={() => toggleFileUpload(!fileUpload)}><FaPhotoVideo/></button>
                    {/*<img src={profile.fileUploadResponse.url} alt="profielfoto" />*/}
                </div>
            </section>}
            <Requests/>
        </>
    );
}

export default Profile;