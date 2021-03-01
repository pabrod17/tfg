import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import * as selectors from '../selectors';
import * as actions from '../actions';
import Teams from './Teams';
import {useEffect} from 'react';

const FindTeamByNameResult = () => {
    const dispatch = useDispatch();

    const team = useSelector(selectors.getTeam);

    return(
            <Teams team={team.team}/>
    );
}

export default FindTeamByNameResult;