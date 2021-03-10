import React from 'react';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';



function TeamName({team, teamName, dispatch, history}){

  if(team){

    return(
      <div>
        <div className="encima">

        <a  href="/" className=" color-byTeamName">
        {"TEAM --> " + team.teamName}                </a>
        </div>
        <div className="encima remove-team">
          <button class="btn btn-primary" type="button" 
            onClick={() => handleRemoveItem(team.id, dispatch, history)}>
            <span className="fas fa-trash-alt"></span>
          </button>
          
          {/* <button className="btn btn-primary" type="button" 
            onClick={() => history.push(`/teams/remove/${team.id}`)}>
            <span className="fas fa-trash-alt"></span>
          </button> */}
          </div>
         </div>

    );
  } else{
      dispatch(actions.findTeamByName(teamName));
      return(
          <div className="spinner-border color-byTeamName" role="status">
          <span className="visually-hidden">Loading...</span>
          </div>        
      );
    }
}

const handleRemoveItem = (id, dispatch, history ) => {
  dispatch(actions.removeTeam(id, () => history.push('/')));
}



  const Team = ({team, teamName}) => {
    const dispatch = useDispatch();
    const history = useHistory();


    return(
        <div>
          <TeamName team={team} teamName={teamName} dispatch={dispatch} history={history} />
        </div>
    )
};

export default Team;