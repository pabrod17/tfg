import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import * as actionsTeams from '../../teams/actions';
import * as selectorsTeams from '../../teams/selectors';
import {useParams} from 'react-router-dom';

const UpdatePlayer = () => {

    const player = useSelector(selectors.getPlayer);
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [dni, setDni] = useState(player.dni);
    const [email, setEmail] = useState(player.email);
    const [phoneNumber, setPhoneNumber] = useState(player.phoneNumber);
    const [playerName, setPlayerName] = useState(player.playerName);
    const [position, setPosition] = useState(player.position);
    const [primaryLastName, setPrimaryLastName] = useState(player.primaryLastName);
    const [secondLastName, setSecondLastName] = useState(player.secondLastName);
    const [teamId, setTeamId] = useState(player.teamId);
    const [trends, setTrends] = useState(player.trends);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();
    
        if (form.checkValidity()) {
            
            dispatch(actions.updatePlayer(player.id, teamId, playerName.trim(), 
            primaryLastName.trim(), secondLastName.trim(), position, trends.trim(),
            phoneNumber.trim(), email.trim(), dni.trim(),
            () => reloadWindow(id),
            errors => setBackendErrors(errors),
            ));
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
            }
        }
    
        const reloadWindow = (id) =>{
            history.push(`/players/home/${id}`);
            window.location.reload('true');
        }

        const teams = useSelector(selectorsTeams.getAllTeams);
        const teamsList = teams.teams;

        if(!teamsList) {
            dispatch(actionsTeams.findAllTeams());
            return "Loading...";
        }

        const pointGuard = "PointGuard";
        const shootingGuard = "ShootingGuard";
        const smallForward = "SmallForward";
        const powerForward = "PowerForward";
        const center = "Center";


    return(

        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="card bg-light border-dark centrado-update-add">
                <h5 className="card-header">
                    Update Team
                </h5>
                <div className="card-body">
                    <form ref={node => form = node} 
                        className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
                        <div className="form-group row">
                            <label htmlFor="firstName" className="col-md-5 col-form-label">
                                Player Name
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="playerName" className="form-control"
                                    value={playerName}
                                    onChange={e => setPlayerName(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="firstName" className="col-md-5 col-form-label">
                            Primary Last Name
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="primaryLastName" className="form-control"
                                    value={primaryLastName}
                                    onChange={e => setPrimaryLastName(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="firstName" className="col-md-5 col-form-label">
                                Second Last Name
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="secondLastName" className="form-control"
                                    value={secondLastName}
                                    onChange={e => setSecondLastName(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>


                        <div className=" row">
                        <label htmlFor="firstName" className="col-md-5 col-form-label">
                                Position
                            </label>
                        <div class="dropdown">
                            <button class="dropbtn">{position} 
                            <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content">
                            <a type="button" onClick={() => setPosition(pointGuard)} >PointGuard</a>
                            <a type="button" onClick={() => setPosition(shootingGuard)} >ShootingGuard</a>
                            <a type="button" onClick={() => setPosition(smallForward)} >SmallForward</a>
                            <a type="button" onClick={() => setPosition(powerForward)} >PowerForward</a>
                            <a type="button" onClick={() => setPosition(center)} >Center</a>
                            </div>
                        </div>
                        </div>




                        <div className="form-group row">
                            <label htmlFor="firstName" className="col-md-5 col-form-label">
                                Trends
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="trends" className="form-control"
                                    value={trends}
                                    onChange={e => setTrends(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="firstName" className="col-md-5 col-form-label">
                                Phone Number
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="phoneNumber" className="form-control"
                                    value={phoneNumber}
                                    onChange={e => setPhoneNumber(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="firstName" className="col-md-5 col-form-label">
                                Email
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="email" className="form-control"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="firstName" className="col-md-5 col-form-label">
                                Dni
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="dni" className="form-control"
                                    value={dni}
                                    onChange={e => setDni(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>


                        <div className=" row">
                        <label htmlFor="firstName" className="col-md-5 col-form-label">
                                Team
                            </label>
                        <div class="dropdown">
                            <button class="dropbtn">Team: {teamId} 
                            <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content">
                            {teamsList.map(team => 
                                        <a type="button" onClick={() => setTeamId(team.id)}> 
                                            {team.id} : {"  "}{team.teamName}
                                        </a>)}
                            </div>
                        </div>
                        </div>




                        <div className="form-group row">
                            <div className="offset-md-3 col-md-1">
                                <button type="submit" className="btn btn-primary">
                                    <FormattedMessage id="project.global.buttons.save"/>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdatePlayer;