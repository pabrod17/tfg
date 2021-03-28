import React from 'react';
import {useDispatch} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

const FindSeasons = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = event => {

    }

    return(
        <form className="form-inline mt-2 mt-md-0" onSubmit={e => handleSubmit(e)}>
            
            <button type="submit" className="btn--primary">
                <FormattedMessage id='ALL SEASONS'/>
            </button>

            <Link className="btn--secundary" to="/">
                <FormattedMessage id='SEASONS BY TWO DATES'/>
            </Link>

            <Link className="btn--third" to="/seasons/new">
                <FormattedMessage id='Add New Season'/>
            </Link>
        </form>
    );
}

export default FindSeasons;