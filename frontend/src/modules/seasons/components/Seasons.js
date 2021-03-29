import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import { useHistory } from 'react-router';
import Card from "react-bootstrap/Card";
import logo22 from './logo22.png';
import {FormattedMessage} from 'react-intl';
import {FormattedDate} from 'react-intl';

function List({ items, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findAllSeasons());
        return fallback;

    } else {
      return items.map(item => {
        return <div className="images-teams" key={item.id}>
            <Card className="images-teams" style={{ width: '20rem' }}>
            <img class="card-img-top" src={logo22} alt="Card image cap"/>
                <Card.Body>
            <Card.Title className="link-color">Season: {" "}
                <span> 
                <FormattedDate
                    value={ item.startDate }
                    year="numeric"
                    // format='year-only'
                />
                / 
                <FormattedDate
                    value={ item.endDate }
                    year="numeric"
                    // format='year-only'
                /> 
                </span>
                <div>
                Calendario: {item.calendario}
                </div>
            </Card.Title>

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
                    onClick={() => handleViewSeason(item.id, dispatch, history)}>
                    {"View"}
                </button>
              </Card.Body>
            </Card>
        </div>;
      });
    }
  }

const handleRemoveItem = (id, dispatch, history) => {
  dispatch(actions.removeSeason(id, () => history.push('/seasons/all/result')));
  window.location.reload('true');
}

const handleUpdateItem = (id, dispatch, history) => {
    dispatch(actions.findSeasonById(id, () => history.push('/seasons/update')));
  }

const handleViewSeason = (id, dispatch, history) => {
    dispatch(actions.findSeasonById(id, () => history.push(`/seasons/view/${id}`)));
  }

const Seasons = ({seasons}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    return(
        <div class="card-group">
            <List items={seasons} fallback={"Loading..."} dispatch = {dispatch} history={history} />
        </div>
    )

};

Seasons.propTypes = {
    seasons: PropTypes.array
};

export default Seasons;