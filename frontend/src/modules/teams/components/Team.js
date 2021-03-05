import React from 'react';
import * as actions from '../actions';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';




function TeamName({team, teamName, dispatch}){

  if(team){
    return(
        <a href="/" className="encima color-byTeamName">
        {"TEAM --> " + team.teamName}</a>
    );
  } else{
      dispatch(actions.findTeamByName(teamName));
      return(
          <div class="spinner-border color-byTeamName" role="status">
          <span class="visually-hidden">Loading...</span>
          </div>        
      );
    }
}



const Team = ({team, teamName}) => {
    const dispatch = useDispatch();
    return(
      <div>
        <TeamName team={team} teamName={teamName} dispatch={dispatch} />
      </div>
    )
};

export default Team;