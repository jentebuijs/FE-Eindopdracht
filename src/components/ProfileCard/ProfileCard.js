import './ProfileCard.css'

function ProfileCard({profile: {firstName, age, aboutMe, level, frequency, fileUploadResponse}}) {
    return (
        <>
            <h3>{firstName}</h3>
            {fileUploadResponse && <img src={fileUploadResponse.url} alt="profielfoto" />}
            <p>Leeftijd: {age}</p>
            <p>Over mij: {aboutMe}</p>
            { level && <p>Nederlands niveau: {level}</p>}

        </>
    );

}

export default ProfileCard;

