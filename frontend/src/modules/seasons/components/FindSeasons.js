import React from 'react';
import {useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import * as actions from '../actions';

const FindSeasons = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(actions.findAllSeasons());
        history.push('/seasons/all/result');
    }

    return(
        <form className="form-inline mt-2 mt-md-0" onSubmit={e => handleSubmit(e)}>
            
            <button type="submit" className="btn--primary--seasons">
                <FormattedMessage id='ALL SEASONS'/>
            </button>

            <Link className="btn--secundary--seasons" to="/seasons/betweenDates">
                <FormattedMessage id='SEASONS BETWEEN TWO DATES'/>
            </Link>

            <Link className="btn--third--seasons" to="/seasons/new">
                <FormattedMessage id='Add New Season'/>
            </Link>
        </form>
    );
}

export default FindSeasons;