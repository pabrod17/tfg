import React from 'react';
import {FormattedMessage} from 'react-intl';
import video from './video-2.mp4';

const Home = () => (


    <div className='hero-container'>

        <video src={video} autoPlay loop muted />
    <div>
    <a className='btn--primary' href="/teams/all">TEAMS</a>
    <a className='btn--secundary' href="/teams/all">SEASONS</a>

    </div>

    </div>


);

export default Home;
