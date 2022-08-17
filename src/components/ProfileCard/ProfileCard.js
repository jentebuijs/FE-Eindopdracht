import './ProfileCard.css'
import {Link} from "react-router-dom";

function ProfileCard({profile}) {
    return (
        <>
            <Link to={`/profiel/${profile.username}`}>{profile.firstName} {profile.lastName}</Link>
            {profile.photo && <img src={profile.photo.url} alt="profielfoto" />}
            <p>Leeftijd: {profile.age}</p>
            <p>Over mij: {profile.aboutMe}</p>
            { profile.level && <p>Nederlands niveau: {profile.level.value}</p>}

        </>
    );

}

export default ProfileCard;

