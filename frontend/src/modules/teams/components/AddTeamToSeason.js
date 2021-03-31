import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {FormattedDate} from 'react-intl';

import * as selectors from '../selectors';
import * as selectorsSeasons from '../../seasons/selectors';
import {Errors} from '../../common';
import * as actions from '../actions';
import * as actionsSeasons from '../../seasons/actions';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

//dispatch(actions.addTeamToSeason(seasonId, teamId, () => history.push('/')));

//dos botones desplegables TEAMS and Seasons. Y un boton AddTeamToSeason



const AddTeamToSeason = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [dropdownTeams, setDropdownTeams] = useState(false);
    const [dropdownSeasons, setDropdownSeasons] = useState(false);
    const [seasonId, setSeasonId] = useState(null);
    const [teamId, setTeamId] = useState(null);


    const openCloseDropdownTeams = () => {
        setDropdownTeams(!dropdownTeams);
    }

    const openCloseDropdownSeasons = () => {
        setDropdownSeasons(!dropdownSeasons);
    }

    const handleAddTeamToSeason = (seasonId, teamId, dispatch, history) => {
        dispatch(actions.addTeamToSeason(seasonId, teamId, () => history.push('/teams/all/result')));
        window.location.reload('true');
      }

    const teams = useSelector(selectors.getAllTeams);
    const seasons = useSelector(selectorsSeasons.getAllSeasons);

    const teamsList = teams.teams;
    const seasonsList = seasons.seasons;

    if(!teamsList || !seasonsList) {
        dispatch(actions.findAllTeams());
        dispatch(actionsSeasons.findAllSeasons());
        return "Loading...";
    }

    return(
        <div>
            <div>
                <Dropdown className="dropDown-teams" isOpen={dropdownTeams} toggle={openCloseDropdownTeams} size="lg">
                    <DropdownToggle caret className="btn--primary ">
                        Teams
                    </DropdownToggle>
                    <DropdownMenu className="ancho-dropdown--teams">
                        <DropdownItem header> Teams:</DropdownItem>
                        <DropdownItem divider></DropdownItem>
                        {teamsList.map(team => <
                            DropdownItem onClick={() => setTeamId(team.id)}> 
                                {team.id} : {"  "}{team.teamName}
                            </DropdownItem>)}
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div>
                <Dropdown className="dropDown-seasons" isOpen={dropdownSeasons} toggle={openCloseDropdownSeasons} size="lg">
                    <DropdownToggle caret className="btn--secundary ">
                        Seasons
                    </DropdownToggle>
                    <DropdownMenu className="ancho-dropdown">
                        <DropdownItem header> Seasons:</DropdownItem>
                        <DropdownItem divider></DropdownItem>
                        {seasonsList.map(season => 
                            <DropdownItem onClick={() => setSeasonId(season.id)} > {season.id} :{"  "}<span> 
                                                                        <FormattedDate
                                                                            value={ season.startDate }
                                                                            year="numeric"
                                                                            // format='year-only'
                                                                        />
                                                                        / 
                                                                        <FormattedDate
                                                                            value={ season.endDate }
                                                                            year="numeric"
                                                                            // format='year-only'
                                                                        /> 
                                                                </span>
                            </DropdownItem>)}
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div>
                <button className="btn--secundary--seasons" type="button" 
                    onClick={() => handleAddTeamToSeason(seasonId, teamId, dispatch, history)}>
                        Save
                </button>
            </div>
        </div>
    );
}

export default AddTeamToSeason;