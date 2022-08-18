import './Button.css'
import React from "react";

function Button({ type, title, onClick, classname}) {
    return (
        <button type={type}
                className={classname}
                onClick={onClick}>
            {title}
        </button>
    );
}

export default Button;