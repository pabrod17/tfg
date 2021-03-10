import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import * as actions from '../actions';

function List({ items, fallback, dispatch}) {
    if (!items || items.length === 0) {

        dispatch(actions.findAllTeams());

        return fallback;
    } else {
      return items.map(item => {
        return <a  key={item.id}>
              <ul className="menu">
                 <li>
                   <div className="encima">

                   <a  href="/" className=" color-byTeamName">
                   {"TEAM --> " + item.teamName}                </a>
                   </div>
                   <div className="encima remove-team">
                      <button className="btn btn-primary" type="submit" 
                        onClick={() => handleRemoveItem()}>
                        <span className="fas fa-trash-alt"></span>
                      </button>
                      </div>
                  </li>
              </ul>
              </a>;
      });
    }
  }

  const handleRemoveItem = () => {


  }

const Teams = ({teams}) => {
    const dispatch = useDispatch();
    return(
      <div>
                <List items={teams} fallback={"Loading..."} dispatch = {dispatch} />

      </div>
        )
    };

Teams.propTypes = {
    teams: PropTypes.array
};

export default Teams;