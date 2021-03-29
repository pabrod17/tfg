import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import { useHistory } from 'react-router';
import {FormattedDate} from 'react-intl';

const SeasonView = () => {

    const {id} = useParams();
    const season = useSelector(selectors.getSeason);
    const dispatch = useDispatch();
    const history = useHistory();

    let form;


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
                                        <h3>50</h3>
                                        <p>Teams</p>
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
            dispatch(actions.findSeasonById(id, () => history.push(`/season/view/${id}`)));
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