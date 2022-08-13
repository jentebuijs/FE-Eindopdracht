import React from 'react';

function Message({ message: {title, content}}) {
    return (
        <>
            <h2>{title}</h2>
            <p>{content}</p>
        </>
    );
}

export default Message;