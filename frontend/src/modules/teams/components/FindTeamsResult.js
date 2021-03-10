import React from 'react';
import {useSelector} from 'react-redux';

import * as selectors from '../selectors';
import Teams from './Teams';

const FindTeamsResult = () => {

    const teams = useSelector(selectors.getAllTeams);

    return(
            <Teams teams={teams.teams}/>
    );
}

export default FindTeamsResult;