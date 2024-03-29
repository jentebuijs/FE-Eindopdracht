import './SignUp.css'
import {useForm} from 'react-hook-form';
import axios from "axios";
import {useHistory} from "react-router-dom";
import {NotificationManager} from "react-notifications";
import Header from "../../components/Header/Header";
import React from "react";

function SignUp() {
    document.title = "DIGITAALBUDDY | Registreren";
    const history = useHistory();
    const {
        register,
        watch,
        handleSubmit,
        formState: {errors}
    } = useForm();
    const authority = register("authority");
    const role = watch("authority");

    async function onSubmit(data) {
        try {
            await axios.post('http://localhost:8080/users/signup', data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(() => {
                NotificationManager.success('Je bent geregistreerd', 'Sweet success!', 1500)
                history.push("/inloggen")
            });

        } catch (e) {
            console.error(e);
            NotificationManager.error('Probeer het opnieuw', 'Er is iets misgegaan!', 1500);
        }
    }

    return (
        <>
            <Header titel="Registreren"/>
            <div className="sign-up-container">
                <form id="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <legend>Gebruiker</legend>
                        <label htmlFor="username">Gebruikersnaam:</label>
                        <input
                            type="text"
                            id="username"
                            {...register("username", {
                                required: 'Dit veld is verplicht',
                                minLength: {
                                    value: 2,
                                    message: "Voer een gebruikersnaam in van minstens 2 tekens"
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Voer een gebruikersnaam in van maximaal 20 tekens"
                                }
                            })} />

                        {errors.username && errors.username.message}

                        <label htmlFor="email">Emailadres:</label>
                        <input
                            type="text"
                            id="email"
                            {...register("email", {
                                required: 'Dit veld is verplicht',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Dit is geen juist emailadres",
                                }
                            })}
                        />

                        {errors.email && errors.email.message}

                        <label htmlFor="password">Wachtwoord:</label>
                        <input type="password" id="password" {...register("password", {
                            required: 'Dit veld is verplicht',
                            minLength: {
                                value: 8,
                                message: "Het wachtwoord moet minstens 8 tekens lang zijn"
                            },
                            maxLength: {
                                value: 20,
                                message: "Het wachtwoord mag maximaal 20 tekens lang zijn"
                            }
                        })} />

                        {errors.password && errors.password.message}

                    </fieldset>
                    <fieldset>
                        <legend>Profiel</legend>
                        <label htmlFor="firstName">Voornaam:</label>
                        <input type="text" id="firstName" {...register("firstName", {
                            required: 'Dit veld is verplicht',
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
                        <input type="text" id="lastName" {...register("lastName", {
                            required: 'Dit veld is verplicht',
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

                        <label htmlFor="dob">Geboortedatum:</label>
                        <input type="Date" id="dob" {...register("dob", {
                            required: 'Dit veld is verplicht'
                        })} />
                        <label htmlFor="aboutMe">Over mij:</label>
                        <textarea id="aboutMe"
                                  rows="10"
                                  {...register("aboutMe", {
                                      required: 'Dit veld is verplicht',
                                      minLength: {
                                          value: 10,
                                          message: "Vertel eens iets over jezelf!"
                                      },
                                      maxLength: {
                                          value: 255,
                                          message: "Maximaal 255 tekens"
                                      }
                                  })} />

                        {errors.dob && errors.dob.message}

                        <div id="select-boxes">
                            <label htmlFor="authority">Ik wil mij aanmelden als:</label>
                            <select
                                defaultValue="none"
                                id="authority"
                                {...register("authority", {required: true})}
                                onChange={(e) => {
                                    authority.onChange(e);
                                    console.log(e);
                                }}
                            >
                                <option value="none" disabled hidden>Kies een optie:</option>
                                <option value="Buddy">Buddy</option>
                                <option value="Student"> Student</option>
                            </select>
                            {errors.authority && errors.authority.message}
                            {role === "Student" &&
                                <>
                                <label htmlFor="level">Nederlands Niveau:</label>
                                    <select defaultValue="none" id="level" {...register("Level")}>
                                        <option value="none" disabled hidden>Kies een optie:</option>
                                        <option value="BEGINNER">Beginner (A1)</option>
                                        <option value="ELEMENTARY"> Beginner (A2)</option>
                                        <option value="INTERMEDIATE"> Gevorderd (B1)</option>
                                        <option value="UPPER_INTERMEDIATE"> Gevorderd (B2)</option>
                                        <option value="ADVANCED"> Vergevorderd (C1)</option>
                                        <option value="PROFICIENT"> Vergevorderd (C2)</option>
                                    </select>
                                </>}
                            {errors.level && errors.level.message}
                            <label htmlFor="frequency">Contact:</label>
                            <select defaultValue="none" id="frequency" {...register("frequency", {
                                required: 'Dit veld is verplicht',
                            })}>
                                <option value="none" disabled hidden>Kies een optie:</option>
                                <option value="EVERY_DAY">Elke dag</option>
                                <option value="FEW_TIMES_A_WEEK"> Paar keer per week</option>
                                <option value="ONCE_A_WEEK"> Een keer per week</option>
                                <option value="FEW_TIMES_A_MONTH"> Paar keer per maand</option>
                                <option value="ONCE_A_MONTH"> Een keer per maand</option>
                            </select>
                            {errors.frequency && errors.frequency.message}
                        </div>
                    </fieldset>
                    <button type="submit">Registreren</button>
                </form>
            </div>
        </>)
        ;
}

export default SignUp;