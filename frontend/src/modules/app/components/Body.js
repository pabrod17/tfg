import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import AppGlobalComponents from './AppGlobalComponents';
import Home from './Home';
import {Login, SignUp, UpdateProfile, ChangePassword, Logout} from '../../users';
import users from '../../users';
import {FindTeamsResult, FindTeams, RemoveTeam} from '../../teams';
import video from './video-2.mp4';
import fondoCanasta from './fondoCanasta.jpg';
import FindTeamByName from '../../teams/components/FindTeamByName';
import FindTeamByNameResult from '../../teams/components/FindTeamByNameResult';

const Body = () => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);
    
   return (

        <div className="hero-container">
                    {/* <video src={video} autoPlay loop muted /> */}
<img className="fondoBasket"  src={fondoCanasta}></img>

            <br/>
            <AppGlobalComponents/>
            <Switch>
                <Route exact path="/"><Home/></Route>
                <Route exact path="/teams/all"><FindTeams/></Route>
                <Route exact path="/teams/all/result"><FindTeamsResult/></Route>
                <Route exact path="/teams/all/name"><FindTeamByName/></Route>
                <Route exact path="/teams/all/name/result/:teamName"><FindTeamByNameResult/></Route>
                <Route exact path="/teams/remove/:teamId"><RemoveTeam/></Route>
                {loggedIn && <Route exact path="/users/update-profile"><UpdateProfile/></Route>}
                {loggedIn && <Route exact path="/users/change-password"><ChangePassword/></Route>}
                {loggedIn && <Route exact path="/users/logout"><Logout/></Route>}
                {!loggedIn && <Route exact path="/users/login"><Login/></Route>}
                {!loggedIn && <Route exact path="/users/signup"><SignUp/></Route>}
                <Route><Home/></Route>
            </Switch>
        </div>

    );

};

export default Body;
