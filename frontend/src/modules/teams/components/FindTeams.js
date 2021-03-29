import React from 'react';
import {useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import * as actions from '../actions';

const FindTeams = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(actions.findAllTeams());
        history.push('/teams/all/result');
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
        </form>
    );
}

export default FindTeams;