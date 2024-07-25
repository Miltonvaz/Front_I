import React from 'react';
import "../molecules/CardsUsers.css";

function CardsUsers({ text, imageUrl }) {
    const [firstName, lastName] = text.split(' '); 

    console.log('Props:', { text, imageUrl });
    console.log('Image URL:', imageUrl);

    return (
        <div id="father-cards">
            <div className="img-cards">
                <img src={imageUrl} alt={`${firstName} ${lastName}`} className="img-cards" />
            </div>
            <div className="text-cards">
                <p>{firstName}</p>
                <p>{lastName}</p>
            </div>
        </div>
    );
}

export default CardsUsers;
