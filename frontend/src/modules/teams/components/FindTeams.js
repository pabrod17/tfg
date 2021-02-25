import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {useEffect} from 'react';

import * as actions from '../actions';
import FindTeamsResult from './FindTeamsResult';

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


            <button type="submit" className="btn btn-primary my-2 my-sm-0">
                <FormattedMessage id='project.global.buttons.search'/>

            </button>



        </form>

    );
}




export default FindTeams;