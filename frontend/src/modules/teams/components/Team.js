import React from 'react';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import logo22 from './logo22.png';


function TeamName({team, teamName, dispatch, history}){

  if(team){

    return(
      

<div className="images-teams centrado-update-add">
          
          <Card className="images-teams" style={{ width: '20rem' }}>
          <img class="card-img-top" src={logo22} alt="Card image cap"/>
            <Card.Body>
              <Card.Title className="link-color">Name: {team.teamName}</Card.Title>
                      <button className="btn btn-primary" type="button" 
                        onClick={() => handleRemoveItem(team.id, dispatch, history)}>
                        <span className="fas fa-trash-alt"></span>
                      </button>
                       <button className="btn btn-secondary" type="button" 
                        onClick={() => history.push('/teams/update')}>
                        <span className="fas fa-pencil-alt"></span>
                      </button>
                      <button className="btn btn-info" type="button" 
                        onClick={() => history.push(`/teams/view/${team.id}`)}>
                        {"View"}
                      </button>
            </Card.Body>
          </Card>

    </div>
      // <div>
      //   <div className="encima ">
      //     <button className="btn btn-info" type="button" 
      //       onClick={() => history.push(`/teams/view/${team.id}`)}>
      //       {"TEAM --> " + team.teamName}
      //     </button>
      //   </div>
      //   <div className="encima remove-team">
      //     <button class="btn btn-primary" type="button" 
      //       onClick={() => handleRemoveItem(team.id, dispatch, history)}>
      //       <span className="fas fa-trash-alt"></span>
      //     </button>
      //   </div>
      //   <div className="encima update-button">
      //     <button className="btn btn-secondary" type="button" 
      //         onClick={() => history.push('/teams/update')}>
      //         <span className="fas fa-pencil-alt"></span>
      //     </button>
      //   </div>
      // </div>
    );
  } else{
      dispatch(actions.findTeamByName(teamName));
      return(
        <div className="centrado-update-add">

          <div className="spinner-border color-byTeamName" role="status">
          <span className="visually-hidden centrado-update-add">Loading...</span>
          </div>  
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