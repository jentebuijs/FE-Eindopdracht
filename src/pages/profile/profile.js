import React from "react";
import {useParams} from "react-router-dom";

function Profile() {
    const { profileId } = useParams();

    return (
        <p>Profile with id {profileId}</p>
    );
}

export default Profile;