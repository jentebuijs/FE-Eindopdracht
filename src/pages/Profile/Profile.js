import './Profile.css'
import {FaRegEdit, FaPhotoVideo, FaUserEdit, FaRegEnvelope} from "react-icons/fa";
import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import PhotoEdit from "../../components/PhotoEdit/PhotoEdit";
import RequestOverview from "../RequestOverview/RequestOverview";
import ProfileEdit from "../../components/ProfileEdit/ProfileEdit";
import UserEdit from "../../components/UserEdit/UserEdit";
import NewRequest from "../../components/newRequest/NewRequest";

function Profile() {
    const {user} = useContext(AuthContext);
    document.title = `DIGITAALBUDDY | Profiel van ${user.username}`
    const {username} = useParams();
    const [file, setFile] = useState();
    const [profileEdit, toggleProfileEdit] = useState(false);
    const [userEdit, toggleUserEdit] = useState(false);
    const [photoEdit, togglePhotoEdit] = useState(false);
    const [newRequest, toggleNewRequest] = useState(false);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const controller = new AbortController();

        fetchProfile(controller);

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
    }, [photoEdit, username]);


    async function fetchProfile(controller) {
        try {
            const response = await axios.get(`http://localhost:8080/profiles?username=${username}`, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }, signal: controller.signal
            });

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
                    {profileEdit &&
                        <ProfileEdit profileData={profile} setProfileData={setProfile} profileEdit={profileEdit}
                                     toggleProfileEdit={toggleProfileEdit}/>}
                    {photoEdit && <PhotoEdit file={file} setFile={setFile} toggleFileUpload={togglePhotoEdit}/>}
                    {userEdit && <UserEdit/>}
                </span>
                :
                <span>
                    {newRequest && <NewRequest key={username} receiver={username} sender={user.username} toggleNewRequest={toggleNewRequest()}/>}
                </span>}
            { profile &&
                <section>
                    <div>
                        {username === user.username ?
                            <h2>Hallo, {profile.firstName}!</h2> : <h2>Hallo, ik ben {profile.firstName}</h2>}

                        <p>Naam: {profile.firstName} {profile.lastName}</p>
                        <p>Leeftijd: {profile.age}</p>
                        <p>Over mij: {profile.aboutMe}</p>
                        {profile.frequency && <p>Contactvoorkeur: {profile.frequency.value}</p>}
                        {profile.level && <p>Nederlands Niveau: {profile.level.value}</p>}
                        <p>Profielinformatie blablabla</p>
                    </div>
                    <div>
                        {profile && username === user.username ?
                            <span>
                    <FaUserEdit onClick={() => toggleUserEdit(!userEdit)}/>
                    <FaRegEdit onClick={() => toggleProfileEdit(!profileEdit)}/>
                    <FaPhotoVideo onClick={() => togglePhotoEdit(!photoEdit)}/>
                            </span> : <span>
                        <FaRegEnvelope onClick={() => {toggleNewRequest(!newRequest)}}/>
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