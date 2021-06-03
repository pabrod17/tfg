import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import { useHistory } from 'react-router';
import Card from "react-bootstrap/Card";
import avatar from '../../players/components/avatar.jpg';
import {FormattedMessage} from 'react-intl';
import lesionPierna from '../../lesion/components/lesionPierna.jpg';
import {FormattedDate} from 'react-intl';
import * as actionsPlayers from '../../players/actions';
import * as selectorsPlayers from '../../players/selectors';
import * as actionsTeams from '../../teams/actions';
import * as selectorsTeams from '../../teams/selectors';
import bigBall from '../../trainings/components/bigBall.jpg';
import naranja from '../../games/components/naranja.jpg';


const handleViewGame = (id, dispatch, history) => {
    dispatch(actions.findGameById(id, () => history.push(`/games/view/${id}`)));
}

const handleRemoveGame = (id, dispatch, history) => {
    dispatch(actions.removeGame(id, () => history.push(`/games/home`)));
    window.location.reload('true');
}

const handleUpdateGame = (id, dispatch, history) => {
    dispatch(actions.findGameById(id, () => history.push(`/games/update/${id}`)));
}

const handleFindPlayersByGame = (gameId, id, dispatch, history) => {
  dispatch(actions.findGameById(gameId, () => console.log(gameId)));
  dispatch(actionsPlayers.findPlayersByGame(gameId, () => history.push(`/players/home/game/${id}${gameId}`)));
}






function GamesList({ items, teamId, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findGamesByUserId(() => history.push('/games/home')));
        return fallback;
    } else {
        return items.map(item => {
          return <div className="images-teams" key={item.id}>
            
            <div class="">
              <div class="card hola pruebo">
                <img src={naranja} alt="Person" class="card__image partidito"></img>
                <p class="card__name">Rival: {item.rival}</p>
                <p class="card__name">                
                <FormattedDate
                    value={ item.gameDate }
                    year="numeric"
                    month="long"
                    day="numeric"
                /> 
                </p>
                <div class="grid-container">
                </div>
                <ul class="social-icons lesiongrande">
                <li><a type="button" onClick={() => handleRemoveGame(item.id, dispatch, history)}>
                  <i class="fa fa-trash"></i></a></li>
                  
                  <li><a type="button" onClick={() => handleViewGame(item.id, dispatch, history)}>
                    <i class="fa fa-address-book"></i></a></li>
                    <li><a type="button" onClick={() => handleUpdateGame(item.id, dispatch, history)}>
                    <i class="fa fa-wrench"></i></a></li>
                  <li><a href="#"><i class="fa fa-codepen"></i></a></li>
                </ul>









                {/* <div class="dropdown">
                <button class="btn-player draw-border">Change Team</button>
                            <div class="dropdown-content">
                            {playersList.map(team => 
                                        <a type="button" onClick={() => handleFindPlayersByTraining(item.id, team.id, dispatch, history)}> 
                                            {team.id} : {"  "}{team.teamName}
                                        </a>)}
                            </div>
                </div> */}

                <button class="btn-player draw-border" type="button" onClick={() => handleFindPlayersByGame(item.id, teamId,dispatch, history)}>Players</button>
              </div>
            </div>
          </div>;
        });
      }
}


function GamesListUser({ items, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findGamesByUserId(() => history.push('/games/home')));
        return fallback;
    } else {
        return items.map(item => {
          return <div className="images-teams" key={item.id}>
            
            <div class="">
              <div class="card hola pruebo">
                <img src={naranja} alt="Person" class="card__image partidito"></img>
                <p class="card__name">Rival: {item.rival}</p>
                <p class="card__name">                
                <FormattedDate
                    value={ item.gameDate }
                    year="numeric"
                    month="long"
                    day="numeric"
                /> 
                </p>
                <div class="grid-container">
                </div>
                <ul class="social-icons lesiongrande">
                <li><a type="button" onClick={() => handleRemoveGame(item.id, dispatch, history)}>
                  <i class="fa fa-trash"></i></a></li>
                  
                  <li><a type="button" onClick={() => handleViewGame(item.id, dispatch, history)}>
                    <i class="fa fa-address-book"></i></a></li>
                    <li><a type="button" onClick={() => handleUpdateGame(item.id, dispatch, history)}>
                    <i class="fa fa-wrench"></i></a></li>
                  <li><a href="#"><i class="fa fa-codepen"></i></a></li>
                </ul>
  
                {/* <div class="dropdown">
                <button class="btn-player draw-border">Change Team</button>
                            <div class="dropdown-content">
                            {playersList.map(team => 
                                        <a type="button" onClick={() => handleFindPlayersByTraining(item.id, team.id, dispatch, history)}> 
                                            {team.id} : {"  "}{team.teamName}
                                        </a>)}
                            </div>
                </div> */}
  
              </div>
            </div>
          </div>;
        });
      }
  }
















const Games = ({games}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const team = useSelector(selectorsTeams.getTeam);

    if (!team) {
        return(
          <div className="card-group">
          <GamesListUser items={games} fallback={"Loading..."} dispatch = {dispatch} history={history} />
          </div>
      );
    } else {
        return(
            <div className="card-group">
            <GamesList items={games}  teamId={team.id} fallback={"Loading..."} dispatch = {dispatch} history={history} />
            </div>
        );
    };

}

Games.propTypes = {
    games: PropTypes.array
};

export default Games;