import './Profile.css'
import {FaRegEdit, FaPhotoVideo, FaUserEdit, FaRegEnvelope} from "react-icons/fa";
import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import PhotoEdit from "./PhotoEdit/PhotoEdit";
import RequestOverview from "../RequestOverview/RequestOverview";
import ProfileEdit from "./ProfileEdit/ProfileEdit";
import UserEdit from "./UserEdit/UserEdit";
import NewRequest from "./newRequest/NewRequest";
import Header from "../../components/Header/Header";
import dtb from "../../assets/DTB.JPG";
import {set} from "react-hook-form";

function Profile() {
    const {user} = useContext(AuthContext);
    document.title = `DIGITAALBUDDY | Profiel van ${user.username}`
    const {username} = useParams();
    const [file, setFile] = useState();
    const [profileEdit, toggleProfileEdit] = useState(false);
    const [userEdit, toggleUserEdit] = useState(false);
    const [photoEdit, togglePhotoEdit] = useState(false);
    const [newRequest, toggleNewRequest] = useState(false);
    const [borderColor, setBorderColor] = useState('');
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const controller = new AbortController();

        fetchProfile(controller);

        switch (profile.role) {
            case "Buddy":
                setBorderColor('#FFD600');
                break;
            case "Student" :
                setBorderColor('#C80000');
                break;
            case "Admin" :
                setBorderColor('#FCA016');
        }

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
            <Header titel="Profiel"/>

            {profileEdit && <ProfileEdit profileData={profile}
                                         setProfileData={setProfile}
                                         profileEdit={profileEdit}
                                         toggleProfileEdit={toggleProfileEdit}/>}

            {photoEdit && <PhotoEdit file={file}
                                     setFile={setFile}
                                     toggleFileUpload={togglePhotoEdit}/>}


            {newRequest && <NewRequest key={username}
                                       receiver={username}
                                       sender={user.username}
                                       toggleNewRequest={toggleNewRequest}/>}

            {profile &&
                <section className="profile-container" style={{borderColor: borderColor}}>
                    <div className="profile-text">
                        {username === user.username ?
                            <h1>Hallo, {profile.firstName}!</h1> : <h1>Hallo, ik ben {profile.firstName}</h1>}

                        <div className="details">
                            <p>Naam: {profile.firstName} {profile.lastName}</p>
                            <p>Leeftijd: {profile.age}</p>
                            <p>Over mij: {profile.aboutMe}</p>
                            {profile.frequency && <p>Contactvoorkeur: {profile.frequency.value}</p>}
                            {profile.level && <p>Nederlands Niveau: {profile.level.value}</p>}
                            <p>Profielinformatie blablabla</p>
                        </div>
                    </div>
                    <div className="profile-img">
                        {profile.photo ?
                            <img src={profile.photo.url} alt="profielfoto"/> :
                            <img src={dtb} alt="standaardafbeelding"/>}
                        {profile && username === user.username ?
                            <span className="icons">
                                <FaUserEdit size='25px'
                                            id="icon"
                                            onClick={() => toggleUserEdit(!userEdit)}/>
                                <FaRegEdit size='25px'
                                           id="icon"
                                           onClick={() => toggleProfileEdit(!profileEdit)}/>
                                <FaPhotoVideo size='25px'
                                              id="icon"
                                              onClick={() => togglePhotoEdit(!photoEdit)}/>
                            </span> : <span className="icons">
                                <FaRegEnvelope size='25px'
                                               id="icon"
                                               onClick={() => toggleNewRequest(!newRequest)}/>
                            </span>}
                        {userEdit && <UserEdit/>}
                    </div>
                </section>}
            {username === user.username &&
                <RequestOverview/>}
        </>
    );
}

export default Profile;