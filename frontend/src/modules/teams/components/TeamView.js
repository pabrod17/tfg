import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';
import { useHistory } from 'react-router';

const TeamView = () => {

    const {id} = useParams();
    const team = useSelector(selectors.getTeam);
    const dispatch = useDispatch();
    const history = useHistory();

    let form;


    function TeamView({team, dispatch}){
        if(team){

            return(

                <div>
                    <div className="card bg-dark text-white border-dark col-md-50">
                        <h5 className="card-header">
                            {team.teamName}
                        </h5>
                        <div className="card-body col-md-50">
                        <div className="form-group row">
                            <label htmlFor="firstName" className="col-md-8 col-form-label">
                                Name:
                            </label>
                            <div className="col-md-10">
                                <strong className="color-byTeamName">{team.teamName}</strong>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            );

        }else{
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