import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import { useHistory } from 'react-router';
import basketball from './basketball.jpg';
import * as actionSeasons from '../../seasons/actions';

//http://envato.jayasankarkr.in/code/profile/assets/img/profile-6.jpg

// https://freefrontend.com/bootstrap-cards/

// https://codepen.io/mrsahar/pen/jRjmdL

// https://pixabay.com/es/images/search/basketball/?pagi=8


const TeamView = () => {

    const {id} = useParams();
    const team = useSelector(selectors.getTeam);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleFindSeasonsToTeam = (id, dispatch, history) => {
        dispatch(actionSeasons.findSeasonsToTeam(id, () => history.push('/seasons/all/result')));
    }


    function TeamView({team, dispatch}){
        if(team){

            return(

                // <div className="centrado">
                //     <div className="card bg-dark text-white border-dark col-md-50">
                //         <h5 className="card-header">
                //             {team.teamName}
                //         </h5>
                //         <div className="card-body col-md-50">
                //         <div className="form-group row">
                //             <label htmlFor="firstName" className="col-md-8 col-form-label">
                //                 Name:
                //             </label>
                //             <div className="col-md-10">
                //                 <strong className="color-byTeamName">{team.teamName}</strong>
                //             </div>
                //         </div>
                //         </div>
                //     </div>
                // </div>

                <div className="col-md-4">

                    <h4 class="text-center color-byTeamName"><strong>TEAM</strong></h4>
                    {/* <div class="profile-card-6"><img src="https://cdn.pixabay.com/photo/2016/03/27/20/58/sky-1284256_960_720.jpg" class="img img-responsive"/> */}
                    <div class="profile-card-6"><img src="https://cdn.pixabay.com/photo/2021/01/18/10/59/basketball-5927762_960_720.jpg" class="img img-responsive"/>
  
                        <div class="profile-name">{team.teamName}</div>
                        <div class="profile-position">TEAM</div>
                        <div class="profile-overview">
                            <div class="profile-overview">
                                <div class="">
                                    <div class="col-xs-4">
                                        <h3>1</h3>
                                        <p>Players</p>
                                    </div>
                                    <div class="col-xs-4">
                                        {/* <h3>50</h3> */}
                                        <button className="btn btn-primary" type="button" onClick={() => handleFindSeasonsToTeam(team.id, dispatch, history)}>Seasons</button>
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
            dispatch(actions.findTeamById(id, () => history.push(`/teams/view/${id}`)));
            return(
                <div className="spinner-border color-byTeamName" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>        
            );
        }
    }

    return(
        <div>
          <TeamView team={team} dispatch={dispatch}/>
        </div>
    );

};
export default TeamView;