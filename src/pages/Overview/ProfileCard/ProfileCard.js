import './ProfileCard.css'
import {Link} from "react-router-dom";
import dtb from '../../../assets/DTB.JPG';

function ProfileCard({profile}) {
    return (
        <div className="profile-card" style={{backgroundColor: profile.role === 'Buddy' ? '#FFD600' : '#C80000'}}>
                <h3><Link to={`/profiel/${profile.username}`}>
                    {profile.firstName} {profile.lastName}
                </Link></h3>

                {profile.photo ? <img src={profile.photo.url} alt="profielfoto"/> : <img src={dtb} alt="standaardafbeelding" />}

                <div className="details">
                    <p>Leeftijd: {profile.age}</p>
                    <p>Over mij: {profile.aboutMe}</p>
                    <p>Contactvoorkeur: {profile.frequency.value}</p>
                    {profile.level && <p>Nederlands niveau: {profile.level.value}</p>}
                </div>
        </div>
    );
}

export default ProfileCard;

