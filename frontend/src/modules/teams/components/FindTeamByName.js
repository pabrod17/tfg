import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

import * as actions from '../actions';

const FindTeamByName = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [teamName, setTeamName] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(actions.findTeamByName( teamName.trim()));
        history.push('/teams/all/name/result');
    }

    return (

        <form className="form-inline mt-2 mt-md-0" onSubmit={e => handleSubmit(e)}>

            <input id="teamName" type="text" className="form-control mr-sm-2"
                value={teamName} onChange={e => setTeamName(e.target.value)}/>

        </form>

    );
}

export default FindTeamByName;