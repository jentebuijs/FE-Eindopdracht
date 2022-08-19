import './ProfileEdit.css'
import React, {useContext, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {useForm} from "react-hook-form";
import axios from "axios";
import {NotificationManager} from "react-notifications";

function ProfileEdit({profileData, setProfileData, toggleProfileEdit, borderColor}) {
    const {user: {username}} = useContext(AuthContext);
    const [profile, setProfile] = useState({...profileData});
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const handleInput = (e) => {
        setProfile({...profile, [e.target.name]: e.target.value});
    };

    async function onSubmit(data) {
        try {
            axios.put(`http://localhost:8080/profiles/${username}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            }).then((response) => {
                setProfileData({...profileData, ...response.data});
                NotificationManager.success('Je profiel is aangepast', 'Sweet success!', 1500);
                toggleProfileEdit(false);
            });

        } catch (e) {
            console.error(e);
            NotificationManager.error('Probeer het opnieuw', 'Er is iets misgegaan!', 1500);
        }
    }

    return (
        <>
            <form className="profile-edit-form" style={{borderColor: borderColor}} onSubmit={handleSubmit(onSubmit)}>
                <h3>Hier kun je je profiel aanpassen</h3>
                <label htmlFor="firstName">Voornaam:</label>
                <input type="text"
                       id="firstName"
                       defaultValue={profile.firstName}
                       onChange={handleInput} {...register("firstName", {
                    minLength: {
                        value: 2,
                        message: "Voer de volledige voornaam in"
                    },
                    maxLength: {
                        value: 20,
                        message: "De voornaam mag maximaal 20 tekens lang zijn"
                    }
                })} />

                {errors.firstName && errors.firstName.message}

                <label htmlFor="lastName">Achternaam:</label>
                <input type="text"
                       id="lastName"
                       defaultValue={profile.lastName}
                       onChange={handleInput} {...register("lastName", {
                    minLength: {
                        value: 3,
                        message: "Voer de volledige achternaam in"
                    },
                    maxLength: {
                        value: 20,
                        message: "De achternaam mag maximaal 20 tekens lang zijn"
                    }
                })} />

                {errors.lastName && errors.lastName.message}

                <label htmlFor="aboutMe">Over mij:</label>
                <textarea id="aboutMe"
                          rows="6"
                          defaultValue={profile.aboutMe}
                          onChange={handleInput} {...register("aboutMe", {
                    minLength: {
                        value: 20,
                        message: "Vertel iets over jezelf"
                    },
                    maxLength: {
                        value: 255,
                        message: "Maximaal 255 tekens"
                    }
                })} />

                {profileData.role === "Student" &&
                    <>
                        <label htmlFor="level">Nederlands Niveau:</label>
                        <select defaultValue={profile.level.key} id="level"
                                onChange={handleInput} {...register("level")}>
                            <option value="BEGINNER">Beginner (A1)</option>
                            <option value="ELEMENTARY">Beginner (A2)</option>
                            <option value="INTERMEDIATE">Gevorderd (B1)</option>
                            <option value="UPPER_INTERMEDIATE">Gevorderd (B2)</option>
                            <option value="ADVANCED">Vergevorderd (C1)</option>
                            <option value="PROFICIENT">Vergevorderd (C2)</option>
                        </select>
                    </>}

                {errors.level && errors.level.message}

                <label htmlFor="frequency">Contact:</label>
                <select defaultValue={profile.frequency.key} id="frequency"
                        onChange={handleInput} {...register("frequency")}>
                    <option value="EVERY_DAY">Elke dag</option>
                    <option value="FEW_TIMES_A_WEEK">Een paar keer per week</option>
                    <option value="ONCE_A_WEEK">Een keer per week</option>
                    <option value="FEW_TIMES_A_MONTH">Een paar keer per maand</option>
                    <option value="ONCE_A_MONTH">Een keer per maand</option>
                </select>

                {errors.frequency && errors.frequency.message}

                <span>
                    <input {...register("activated", {required: true})}
                           type="radio"
                           value="true"
                           defaultChecked={profileData.activated === true}
                           id="true"/>
                    <label htmlFor="true">Actief</label>
                    <input  {...register("activated", {required: true})}
                            type="radio"
                            value=" false"
                            defaultChecked={profileData.activated === false}
                            id="false"/>
                    <label htmlFor="false">Inactief</label>
                </span>

                <button type="submit">Opslaan</button>
            </form>
        </>
    );
}

export default ProfileEdit;