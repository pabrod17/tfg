import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as selectors from '../selectors';
import Team from './Team';



const FindTeamByNameResult = () => {
    
    const team = useSelector(selectors.getTeam);
    return(
        <Team team={team}/>
    );
}

export default FindTeamByNameResult;