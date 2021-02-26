import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import users from '../../users';
// import blueeee from './blueeee.png';
import './Hero.css';
import video from './video-2.mp4';

// var sectionStyle = {
//     width: "100%",
//     height: "400px",
//     backgroundImage: "url(" + { blueeee } + ")"
//   };

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(users.actions.tryLoginFromServiceToken(
            () => dispatch(users.actions.logout())));
    
    });

    return (
        <div>
            <Router>
                {/* <div className='hero-container'> */}
                <div>

                    <Header/>

                    <Body/>

                    {/* <img src={blueeee} /> */}

                </div>
            </Router>
            <Footer/>
        </div>
    );

}
    
export default App;