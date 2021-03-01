import React from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../actions';
import logo22 from './logo22.png';


const Team = ({team}) => {
    const dispatch = useDispatch();
    return(
      <div>
            <Link className=" nav-link centrado" to="/">{team.teamName}</Link>
      </div>
        )
    };

export default Team;