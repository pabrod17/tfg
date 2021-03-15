import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import { useHistory } from 'react-router';
import Card from "react-bootstrap/Card";
import logo22 from './logo22.png';

function List({ items, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findAllTeams());

        return fallback;
    } else {
      return items.map(item => {
        return <div className="images-teams" key={item.id}>
          
            <Card className="images-teams" style={{ width: '20rem' }}>
            <img class="card-img-top" src={logo22} alt="Card image cap"/>
              <Card.Body>
                <Card.Title className="link-color">Name: {item.teamName}</Card.Title>

              </Card.Body>
              {/* <ListGroup className="list-group-flush">
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
              </ListGroup> */}
              <Card.Body>
                        <button className="btn btn-primary" type="button" 
                          onClick={() => handleRemoveItem(item.id, dispatch, history)}>
                          <span className="fas fa-trash-alt"></span>
                        </button>
                         <button className="btn btn-secondary" type="button" 
                          onClick={() => handleUpdateItem(item.id, dispatch, history)}>
                          <span className="fas fa-pencil-alt"></span>
                        </button>
                        <button className="btn btn-info" type="button" 
                          onClick={() => handleViewTeam(item.id, dispatch, history)}>
                          {"View"}
                        </button>
              </Card.Body>
            </Card>

      </div>;
});
      //   return <a  key={item.id}>
      //           <ul className="menu">
      //             <li>
      //               <div className="encima ">
      //                   <button className="btn btn-info" type="button" 
      //                     onClick={() => handleViewTeam(item.id, dispatch, history)}>
      //                       {"TEAM --> " + item.teamName}
      //                   </button>
      //               </div>
      //               <div className="encima remove-team">
      //                   <button className="btn btn-primary" type="button" 
      //                     onClick={() => handleRemoveItem(item.id, dispatch, history)}>
      //                     <span className="fas fa-trash-alt"></span>
      //                   </button>
      //               </div>
      //               <div className="encima update-button">
      //                   <button className="btn btn-secondary" type="button" 
      //                     onClick={() => handleUpdateItem(item.id, dispatch, history)}>
      //                     <span className="fas fa-pencil-alt"></span>
      //                   </button>
      //               </div>
      //             </li>
      //           </ul>
      //         </a>;
      // });
    }
  }

const handleRemoveItem = (id, dispatch, history) => {
  dispatch(actions.removeTeam(id, () => history.push('/teams/all/result')));
  window.location.reload('true');
}

const handleUpdateItem = (id, dispatch, history) => {
  dispatch(actions.findTeamById(id, () => history.push('/teams/update')));
}

const handleViewTeam = (id, dispatch, history) => {
  dispatch(actions.findTeamById(id, () => history.push(`/teams/view/${id}`)));
}

const Teams = ({teams}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    return(
<div class="card-group">
                <List items={teams} fallback={"Loading..."} dispatch = {dispatch} history={history} />

      </div>
        )
    };

Teams.propTypes = {
    teams: PropTypes.array
};

export default Teams;