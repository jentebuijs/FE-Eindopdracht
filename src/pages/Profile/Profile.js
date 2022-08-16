import './Profile.css'
import {FaRegEdit, FaPhotoVideo, FaUserEdit, FaRegEnvelope} from "react-icons/fa";
import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Button from "../../components/Button/Button";
import PhotoEdit from "../../components/PhotoEdit/PhotoEdit";
import RequestOverview from "../RequestOverview/RequestOverview";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";
import UserEdit from "../../components/UserEdit/UserEdit";
import NewRequest from "../../components/newRequest/NewRequest";
import {set} from "react-hook-form";

function Profile() {
    const {username} = useParams();
    const {user} = useContext(AuthContext);
    const [file, setFile] = useState();
    const [profileEdit, toggleProfileEdit] = useState(false);
    const [userEdit, toggleUserEdit] = useState(false);
    const [fileUpload, toggleFileUpload] = useState(false);
    const [newRequest, toggleNewRequest] = useState(false);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        document.title = `DIGITAALBUDDY | Profiel van ${user.username}`
        const controller = new AbortController();
        fetchProfile(controller);
        console.log(profile);
        return function cleanup() {
            controller.abort();
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        fetchProfile(controller);
        toggleProfileEdit(false);
        toggleUserEdit(false);
        toggleNewRequest(false);
        return function cleanup() {
            controller.abort();
        }
    }, [fileUpload, username]);


    async function fetchProfile(controller) {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`http://localhost:8080/profiles?username=${username}`, {
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
        return function cleanup() {
            controller.abort();
        }
    }

    return (
        <>
            {username === user.username ?
                <span>
                    {profileEdit && <ProfileEdit profileData={profile} setProfileData={setProfile}/>}
                    {fileUpload && <PhotoEdit file={file} setFile={setFile} toggleFileUpload={toggleFileUpload}/>}
                    {userEdit && <UserEdit/>}
                </span>
                :
                <span>
                    {newRequest && <NewRequest key={username} receiver={username} sender={user.username}/>}
                </span>}
            {profile &&
                <section>
                    <div>
                        {username === user.username ?
                            <h2>Hallo, {username}!</h2> : <h2>Hallo, ik ben {username}</h2>}

                        <p>Naam: {profile.firstName} {profile.lastName}</p>
                        <p>Leeftijd: {profile.age}</p>
                        <p>Profielinformatie blablabla</p>
                    </div>
                    <div>
                        {profile && username === user.username ?
                            <span>
                    <FaUserEdit onClick={() => toggleUserEdit(!userEdit)}/>
                    <FaRegEdit onClick={() => toggleProfileEdit(!profileEdit)}/>
                    <FaPhotoVideo onClick={() => toggleFileUpload(!fileUpload)}/>
                            </span> : <span>
                        <FaRegEnvelope onClick={() => toggleNewRequest(!newRequest)}/>
                            </span>}
                        {profile.photo && <img src={profile.photo.url} alt="profielfoto"/>}
                    </div>
                </section>
            }
            {username === user.username &&
                <RequestOverview/>
            }
        </>
    );
}

export default Profile;