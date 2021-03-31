import React from 'react';
import {useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import * as actionsSeasons from '../../seasons/actions';

import * as actions from '../actions';

const FindTeams = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(actions.findAllTeams());
        history.push('/teams/all/result');
    }

    const handleAddTeamToSeason = (dispatch, history ) => {
        dispatch(actions.findAllTeams());
        dispatch(actionsSeasons.findAllSeasons());
        history.push('/teams/addTeamToSeason');;
    }

    return (

        <form className="form-inline mt-2 mt-md-0" onSubmit={e => handleSubmit(e)}>

            <button type="submit" className="btn--primary">
                <FormattedMessage id='ALL TEAMS'/>
            </button>

            <Link className="btn--secundary" to="/teams/all/name">
                <FormattedMessage id='TEAM NAME'/>
            </Link>

            <Link className="btn--third" to="/teams/new">
                <FormattedMessage id='Add New Team'/>
            </Link>

            {/* <Link className="btn--secundary--seasons" to="/teams/addTeamToSeason">
                <FormattedMessage id='Add Team To Season'/>
            </Link> */}

            <button className="btn--secundary--seasons" type="button" 
                onClick={() => handleAddTeamToSeason(dispatch, history)}>
                    <FormattedMessage id='Add Team To Season'/>
            </button>

        </form>
    );
}

export default FindTeams;