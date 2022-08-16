import './ProfileEdit.css'
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "react-hook-form";
import axios from "axios";

function ProfileEdit({profileData}) {
    const [profileDataData, setProfileDataData] = useState({...profileData});\ m,,m,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,\\\\\\\\\\\\\
    const {user: {username}} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const [success, toggleSuccess] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm();

    const handleInput = (e) => {
        console.log(e.target.name, " : ", e.target.value);
        setProfileDataData({ ...profileDataData, [e.target.name]: e.target.value });
    };



    async function onSubmit(data) {
        console.log(data);
        console.log(profileData);
        try {
            const response = await axios.put(`http://localhost:8080/profiles/${username}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                Authorization: `Bearer ${token}`
            });
            console.log(response);
            toggleSuccess(true);
        } catch (e) {
            toggleSuccess(false);
            console.error(e);
        }
    }

    async function handleClick(active) {
        try {
            const response = await axios.put(`http://localhost:8080/profiles/${username}?active=${active}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                Authorization: `Bearer ${token}`
            });
            console.log(response)
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            {profileData.active ?
                <button type="button"
                        value="false"
                        onClick={(e) => handleClick(e.target.value)}>
                    Deactiveer
                </button>
                :
                <button type="button"
                        value="true"
                        onClick={(e) => handleClick(e.target.value)}>
                    Activeer
                </button>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <legend>Profiel</legend>
                    {success && <p>Uw profiel is aangepast</p>}
                    <label htmlFor="firstName">Voornaam:</label>
                    <input type="text"
                           id="firstName"
                           value={profileDataData.firstName}
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
                    <br/>
                    {errors.firstName && errors.firstName.message}
                    <br/>
                    <label htmlFor="lastName">Achternaam:</label>
                    <input type="text"
                           id="lastName"
                           placeholder={profileDataData.lastName}
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
                    <br/>
                    {errors.lastName && errors.lastName.message}
                    <br/>
                    <label htmlFor="aboutMe">Over mij:</label>
                    <textarea id="aboutMe" onChange={handleInput} {...register("aboutMe", {
                        minLength: {
                            value: 20,
                            message: "Vertel iets over jezelf"
                        },
                        maxLength: {
                            value: 255,
                            message: "Maximaal 255 tekens"
                        }
                    })} />
                    <br/>
                    {profileData.role === "Student" &&
                        <label htmlFor="level">Nederlands Niveau:
                            <select defaultValue={profileDataData.level.key} id="level" onChange={handleInput} {...register("level")}>
                                <option value="BEGINNER">Beginner (A1)</option>
                                <option value="ELEMENTARY">Beginner (A2)</option>
                                <option value="INTERMEDIATE">Gevorderd (B1)</option>
                                <option value="UPPER_INTERMEDIATE">Gevorderd (B2)</option>
                                <option value="ADVANCED">Vergevorderd (C1)</option>
                                <option value="PROFICIENT">Vergevorderd (C2)</option>
                            </select>
                        </label>}
                    {errors.level && errors.level.message}
                    <label htmlFor="frequency">Contact:</label>
                    <select defaultValue={profileDataData.frequency.key} id="frequency" onChange={handleInput} {...register("frequency")}>
                        <option value="EVERY_DAY">Elke dag</option>
                        <option value="FEW_TIMES_A_WEEK">Een paar keer per week</option>
                        <option value="ONCE_A_WEEK">Een keer per week</option>
                        <option value="FEW_TIMES_A_MONTH">Een paar keer per maand</option>
                        <option value="ONCE_A_MONTH">Een keer per maand</option>
                    </select>
                    <br/>
                    {errors.frequency && errors.frequency.message}
                    <br/>
                </fieldset>
                <button type="submit">Opslaan</button>
            </form>
        </>
    );
}

export default ProfileEdit;