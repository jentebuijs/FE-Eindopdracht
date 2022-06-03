import './button.css'
import React from "react";

function Button({ title, onClick }) {
    return (
        <button type="button" onClick={onClick}>
            {title}
        </button>
    );
}

export default Button;