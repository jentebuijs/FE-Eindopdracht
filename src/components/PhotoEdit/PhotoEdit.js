import "./PhotoEdit.css"
import {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

function PhotoEdit() {
    const {user: {username}} = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const [file, setFile] = useState([]);
    const [success, toggleSuccess] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');

    function handleImageChange(e) {
        const uploadedFile = e.target.files[0];
        console.log(uploadedFile);
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }

    async function sendImage(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        try {
            const result = await axios.post(`http://localhost:8080/profiles/${username}/photo`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    Authorization: `Bearer ${token}`
                })
            console.log(result.data);
            toggleSuccess(true);
            setFile([]);
            setPreviewUrl('');
        } catch (e) {
            toggleSuccess(false);
            console.error(e)
        }
    }

    return (
        <div className="page-container">
            <h1>Afbeelding uploaden en preview bekijken</h1>
            {success && <p>Uw profielfoto is aangepast</p> }
            <form onSubmit={sendImage}>
                <label htmlFor="user-image">
                    Kies afbeelding:
                    <input type="file" name="image-field" id="user-image" onChange={handleImageChange}/>
                </label>
                {previewUrl &&
                    <label>
                        Preview:
                        <img src={previewUrl} alt="Voorbeeld van de afbeelding die zojuist gekozen is" className="image-preview"/>
                    </label>
                }
                <button type="submit">Uploaden</button>
            </form>
        </div>
    );
}

export default PhotoEdit;