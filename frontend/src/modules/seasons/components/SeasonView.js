import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import { useHistory } from 'react-router';
import {FormattedDate} from 'react-intl';
import * as actionsTeams from '../../teams/actions';

const SeasonView = () => {

    const {id} = useParams();
    const season = useSelector(selectors.getSeason);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleFindTeamsToSeason = (id, dispatch, history) => {
        dispatch(actionsTeams.findTeamsToSeason(id, () => history.push('/teams/all/result')));
    }

    function SeasonView({season, dispatch}){

            if(season){
                return(
                    <div className="col-md-4">
                        <h4 class="text-center color-byTeamName"><strong>SEASON</strong></h4>
                        {/* <div class="profile-card-6"><img src="https://cdn.pixabay.com/photo/2016/03/27/20/58/sky-1284256_960_720.jpg" class="img img-responsive"/> */}
                        <div class="profile-card-6"><img src="https://cdn.pixabay.com/photo/2021/01/18/10/59/basketball-5927762_960_720.jpg" class="img img-responsive"/>
    
                            <div class="profile-name">
                                <FormattedDate
                                    value={ season.startDate }
                                    year="numeric"
                                />
                            / 
                                <FormattedDate
                                value={ season.endDate }
                                year="numeric"
                                /> 
                            </div>
                            <div class="profile-position">SEASON</div>
                            <div class="profile-overview">
                                <div class="profile-overview">
                                    <div class="">
                                        <div class="col-xs-4">
                                            <h3>1</h3>
                                            <p>Games</p>
                                        </div>
                                        <div class="col-xs-4">
                                        {/* <h3>{teamsList.length}</h3> */}
                                            <button className="btn btn-primary" type="button" onClick={() => handleFindTeamsToSeason(season.id, dispatch, history)}>Teams</button>
                                        </div>
                                        <div class="col-xs-4">
                                            <h3>35</h3>
                                            <p>Plays</p>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        </div>
                    </div>
                );
            }
            else{
                dispatch(actions.findSeasonById(id, () => history.push(`/seasons/view/${id}`)));
                return(
                    <div className="spinner-border color-byTeamName" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </div>        
                );
            }
    }

    return(
        <div>
          <SeasonView season={season} dispatch={dispatch}/>
        </div>
    );
}

export default SeasonView;