import React from 'react';

function Message({title, content}) {
    return (
        <>
            <h2>{title}</h2>
            <p>{content}</p>
        </>
    );
}

export default Message;