import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import AppGlobalComponents from './AppGlobalComponents';
import Home from './Home';
import {Login, SignUp, UpdateProfile, ChangePassword, Logout} from '../../users';
import users from '../../users';
import {FindTeamsResult, FindTeams, RemoveTeam, AddTeam, UpdateTeam, TeamView} from '../../teams';
import video from './video-2.mp4';
import fondoCanasta from './fondoCanasta.jpg';
import FindTeamByName from '../../teams/components/FindTeamByName';
import FindTeamByNameResult from '../../teams/components/FindTeamByNameResult';
import FindSeasons from '../../seasons/components/FindSeasons';
import AddSeason from '../../seasons/components/AddSeason';
import FindSeasonsResult from '../../seasons/components/FindSeasonsResult';
import SeasonView from '../../seasons/components/SeasonView';
import UpdateSeason from '../../seasons/components/UpdateSeason';
import FindSeasonsBetweenTwoDates from '../../seasons/components/FindSeasonsBetweenTwoDates';
import FindSeasonsBetweenTwoDatesResult from '../../seasons/components/FindSeasonsBetweenTwoDatesResult';
import AddTeamToSeason from '../../teams/components/AddTeamToSeason';

const Body = () => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);
    
   return (

        <div className="hero-container">
            {/* <video src={video} autoPlay loop muted /> */}

            <br/>
            <AppGlobalComponents/>
            <Switch>
                <Route exact path="/"><Home/></Route>
                {loggedIn && <Route exact path="/teams/new"><AddTeam/></Route>}
                {loggedIn && <Route exact path="/teams/update"><UpdateTeam/></Route>}
                {loggedIn && <Route exact path="/teams/addTeamToSeason"><AddTeamToSeason/></Route>}
                {loggedIn && <Route exact path="/teams/view/:id"><TeamView/></Route>}
                {loggedIn && <Route exact path="/teams/all"><FindTeams/></Route>}
                {loggedIn && <Route exact path="/teams/all/result"><FindTeamsResult/></Route>}
                {loggedIn && <Route exact path="/teams/all/name"><FindTeamByName/></Route>}
                {loggedIn && <Route exact path="/teams/all/name/result/:teamName"><FindTeamByNameResult/></Route>}
                {loggedIn && <Route exact path="/seasons/all"><FindSeasons/></Route>}
                {loggedIn && <Route exact path="/seasons/new"><AddSeason/></Route>}
                {loggedIn && <Route exact path="/seasons/update"><UpdateSeason/></Route>}
                {loggedIn && <Route exact path="/seasons/all/result"><FindSeasonsResult/></Route>}
                {loggedIn && <Route exact path="/seasons/betweenDates"><FindSeasonsBetweenTwoDates/></Route>}
                {loggedIn && <Route exact path="/seasons/betweenDates/result/:startDate/:endDate"><FindSeasonsBetweenTwoDatesResult/></Route>}
                {loggedIn && <Route exact path="/seasons/view/:id"><SeasonView/></Route>}
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
