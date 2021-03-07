import React from 'react';
import * as actions from '../actions';
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';




function TeamName({team, teamName, dispatch}){

  if(team){
    return(
      <div>
        <div className="encima">

        <a  href="/" className=" color-byTeamName">
        {"TEAM --> " + team.teamName}                </a>
        </div>
        <div className="encima remove-team">
          <button class="btn btn-primary" type="submit" 
            onClick={() => handleRemoveItem()}>
            <span className="fas fa-trash-alt"></span>
          </button>
          </div>
         </div>

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

const handleRemoveItem = () => {


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