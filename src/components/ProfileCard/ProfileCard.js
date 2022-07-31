import './ProfileCard.css'

function ProfileCard({profile: {firstname, level, contact_intensity}}) {
    return (
        <>
            <h3>Hoi, ik ben {firstname}!</h3>
        </>
    );

}

export default ProfileCard;

