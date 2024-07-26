import React from 'react';

const CardsEmployees = (props) => {
    const { text, imageUrl } = props;
    const [firstName, lastName] = (text && typeof text === 'string') ? text.split(' ') : ['Unknown', 'Name'];
    console.log('Props:', props); 
    console.log('Image URL:', imageUrl);

    return (
        <>
            <div id="father-cards">
                <div className="img-cards">
                    <img src={imageUrl} alt={`${firstName} ${lastName}`} className="img-cards" />
                </div>
                <div className="text-cards">
                    <p>{firstName}</p>
                    <p>{lastName}</p>
                </div>
            </div>
        </>
    );
};

export default CardsEmployees;
