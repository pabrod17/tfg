import React, {useState} from 'react';
import {useEffect} from 'react';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {Errors} from '../../common';
import {useSelector} from 'react-redux';
import * as selectors from '../selectors';

const RemoveTeam = () => {
    const {teamId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [backendErrors, setBackendErrors] = useState(null);
    const team = useSelector(selectors.getTeam);

    function TeamRemoved(){

    if(team){
      
        dispatch(actions.removeTeam(teamId));
            return(
                <div>
                  <div className="encima">
                  <a  href="/" className=" color-byTeamName">
                  {"TEAM removed --> " + teamId}</a>
                  </div>
                </div>
            );
    } else{
        // dispatch(actions.findTeamByName("SEGUNDO"));

        return(
            <div>
          <a href="/teams/all" className="encima color">HOLA</a>
          </div>        
        );
    }
    }

    // useEffect(() => {
    //     dispatch(actions.removeTeam(teamId,
    //         () => history.push('/teams/all')
    //         ));
    // });
    return(
        <div>
            <TeamRemoved/>
          {/* <a href="/teams/all" className="encima color">HOLA</a> */}
        </div>
    )
}

export default RemoveTeam;