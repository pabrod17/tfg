import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as selectors from '../selectors';



const FindTeamByNameResult = () => {
    
    const team = useSelector(selectors.getTeam);
    console.log(team);
    if(team){
        return(
            <a  className="encima">
            {"TEAM --> " + team.teamName}</a>
        );
    } else{
        return(
            <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
            </div>        
        );
    }

    
}

export default FindTeamByNameResult;