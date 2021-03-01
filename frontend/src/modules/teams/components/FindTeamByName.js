import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {useEffect} from 'react';

import * as actions from '../actions';

const findTeamByName = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [teamName, setTeamName] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(actions.findTeamByName(
            {
                teamName: teamName.trim()
            }
        ));
        history.push('/team/name/result');
    }

    return (

        <form className="form-inline mt-2 mt-md-0" onSubmit={e => handleSubmit(e)}>

            <input id="teamName" type="text" className="form-control mr-sm-2"
                value={teamName} onChange={e => setKeywords(e.target.value)}/>

        </form>

    );
}




export default findTeamByName;