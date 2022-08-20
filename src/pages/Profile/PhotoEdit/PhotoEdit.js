import "./PhotoEdit.css"
import {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";
import {NotificationManager} from "react-notifications";
import Button from "../../../components/Button/Button";

function PhotoEdit({file, setFile, toggleFileUpload, borderColor}) {
    const {user: {username}} = useContext(AuthContext);
    const [previewUrl, setPreviewUrl] = useState('');

    function handleImageChange(e) {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }

    async function sendImage(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post(`http://localhost:8080/photos/upload/${username}`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            ).then(() => {
                setPreviewUrl('');
                NotificationManager.success('Je profielfoto is aangepast', 'Sweet success!', 1500);
                toggleFileUpload(false);
            });

        } catch (e) {
            console.error(e);
            NotificationManager.error('Probeer het opnieuw', 'Er is iets misgegaan!', 1500);
        }
    }

    return (
        <div className="photo-edit-container" style={{borderColor: borderColor}}>
            <h3>Hier kun je je profielfoto uploaden</h3>
            <form className="photo-edit-form" onSubmit={sendImage}>
                <label htmlFor="user-image">Kies afbeelding:</label>
                <input type="file"
                       name="image-field"
                       id="user-image"
                       onChange={handleImageChange}/>
                {previewUrl &&
                    <>
                        <label>Preview:</label>
                        <img src={previewUrl} alt="Voorbeeld van de afbeelding die zojuist gekozen is"
                             className="image-preview"/>
                    </>
                }
                <Button type="submit"
                        title="Uploaden"/>
            </form>
        </div>
    );
}

export default PhotoEdit;