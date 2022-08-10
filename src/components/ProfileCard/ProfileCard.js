import './ProfileCard.css'

function ProfileCard({profile: {firstName, level, frequency}}) {
    return (
        <>
            <h3>Hoi, ik ben {firstName}!</h3>
        </>
    );

}

export default ProfileCard;

