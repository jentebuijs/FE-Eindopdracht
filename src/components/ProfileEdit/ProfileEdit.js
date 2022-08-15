import './ProfileEdit.css'
import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "react-hook-form";
import axios from "axios";

function ProfileEdit({profileData}) {
    const {user: {username}} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const [success, toggleSuccess] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm();

    async function onSubmit(data) {
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

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <legend>Profiel</legend>
                    {success && <p>Uw profiel is aangepast</p>}
                    <label htmlFor="firstName">Voornaam:</label>
                    <input type="text" id="firstName" placeholder={profileData.firstName} {...register("firstName", {
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
                    <input type="text" id="lastName" placeholder={profileData.lastName} {...register("lastName", {
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
                    <label htmlFor="dob">Geboortedatum:</label>
                    <input type="datetime" id="dob" placeholder={profileData.dob} {...register("dob")} />
                    <label htmlFor="aboutMe">Over mij:</label>
                    <textarea id="aboutMe" placeholder={profileData.aboutMe} {...register("aboutMe", {
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
                    {errors.dob && errors.dob.message}
                    <br/>
                    {profileData.authority === "Student" &&
                        <label htmlFor="level">Nederlands Niveau:
                            <select defaultValue={profileData.level} id="level" {...register("Level")}>
                                <option value="BEGINNER">Beginner (A1)</option>
                                <option value="ELEMENTARY"> Beginner (A2)</option>
                                <option value="INTERMEDIATE"> Gevorderd (B1)</option>
                                <option value="UPPER_INTERMEDIATE"> Gevorderd (B2)</option>
                                <option value="ADVANCED"> Vergevorderd (C1)</option>
                                <option value="PROFICIENT"> Vergevorderd (C2)</option>
                            </select>
                        </label>}
                    {errors.level && errors.level.message}
                    <label htmlFor="frequency">Contact:</label>
                    <select defaultValue={profileData.frequency} id="frequency" {...register("frequency")}>
                        <option value="EVERY_DAY">Elke dag</option>
                        <option value="FEW_TIMES_A_WEEK"> Paar keer per week</option>
                        <option value="ONCE_A_WEEK"> Een keer per week</option>
                        <option value="FEW_TIMES_A_MONTH"> Paar keer per maand</option>
                        <option value="ONCE_A_MONTH"> Een keer per maand</option>
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