import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';
import { useHistory } from 'react-router';
import Card from "react-bootstrap/Card";
import logo22 from './logo22.png';
import {FormattedDate} from 'react-intl';
import {FormattedMessage} from 'react-intl';


function List({ items, startDate, endDate, fallback, dispatch, history}) {
    if (!items || items.length === 0) {
        dispatch(actions.findSeasonsBetweenTwoDates(
            startDate,
            endDate
        , () => history.push(`/seasons/betweenDates/result/${startDate.trim()}/${endDate.trim()}`),
        ));
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
                    onClick={() => handleRemoveItem(item.id, startDate, endDate, dispatch, history)}>
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

const handleRemoveItem = (id, startDate, endDate, dispatch, history) => {
  dispatch(actions.removeSeason(id, () => history.push(`/seasons/betweenDates/result/${startDate.trim()}/${endDate.trim()}`)));
  window.location.reload('true');
}

const handleUpdateItem = (id, dispatch, history) => {
    dispatch(actions.findSeasonById(id, () => history.push('/seasons/update')));
  }

const handleViewSeason = (id, dispatch, history) => {
    dispatch(actions.findSeasonById(id, () => history.push(`/seasons/view/${id}`)));
  }

const SeasonsBetweenTwoDates = ({seasons, startDate, endDate}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    if(!seasons){
      return (
        <div className="alert alert-info color-alert encima" role="alert">
            <FormattedMessage id='project.seasons.FindSeason.noSeason'/>
        </div>
       );
    }

    return(
        <div class="card-group">
            <List items={seasons} startDate = {startDate} endDate = {endDate} fallback={"Loading..."} dispatch = {dispatch} history={history} />
        </div>
    )

};

SeasonsBetweenTwoDates.propTypes = {
    seasons: PropTypes.array
};

export default SeasonsBetweenTwoDates;