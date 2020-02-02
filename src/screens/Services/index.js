import React from 'react';
import WaitingRoom from '../Services/WaitingRoom';
import Bath from '../Services/Bath';
import Grooming from '../Services/Grooming';

function Index() {

    return (
        <div>
            <WaitingRoom />
            <br />
            <Grooming />
            <br />
            <Bath />
        </div>
    )
}

export default Index
