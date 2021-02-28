import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import * as selectors from '../selectors';
import * as actions from '../actions';
import Teams from './Teams';
import {useEffect} from 'react';

const FindTeamsResult = () => {
    const dispatch = useDispatch();

    const teams = useSelector(selectors.getAllTeams);

    return(
            <Teams teams={teams.teams}/>
    );
}

export default FindTeamsResult;