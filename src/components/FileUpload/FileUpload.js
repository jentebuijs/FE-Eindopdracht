import {useState} from "react";
import axios from "axios";

function FileUpload() {
    const [file, setFile] = useState([]);
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
            const result = await axios.post('http://localhost:8080/photos/upload', formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                })
            console.log(result.data);
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="page-container">
            <h1>Afbeelding uploaden en preview bekijken</h1>
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

export default FileUpload;