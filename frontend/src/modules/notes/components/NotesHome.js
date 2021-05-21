import React from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';

import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import Notes from './Notes';

const NotesHome = () => {
    const {playerId} = useParams();
    const {id} = useParams();
    const notes = useSelector(selectors.getNotes);

    return(
        <div>
            <Notes notes={notes.notes} playerId={playerId} id={id}/>
        </div>
    );
}

export default NotesHome;