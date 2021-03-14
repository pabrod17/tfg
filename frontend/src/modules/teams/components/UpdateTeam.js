import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';

const UpdateTeam = () => {

   const team = useSelector(selectors.getTeam);
   //creo que esto solo funciona para cuando busco por el nombre
   //ya que ahi tengo el estado previo de team. Y en el caso de AllTeams
   //tengo el estado teams que me devolveria una lista y tendria que ver 
   //cual de la lista e seleccionado
   const dispatch = useDispatch();
   const history = useHistory();
   const [teamName, setTeamName] = useState(team.teamName);
   const [backendErrors, setBackendErrors] = useState(null);
   let form;

   const handleSubmit = event => {

    event.preventDefault();

    if (form.checkValidity()) {
        
        dispatch(actions.updateTeam({
            id: team.id,
            teamName: teamName.trim()
        }, () => history.push('/'),
            errors => setBackendErrors(errors),
        ));
    } else {
        setBackendErrors(null);
        form.classList.add('was-validated');
        }
    }

    return(

<div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="card bg-light border-dark">
                <h5 className="card-header">
                    Update Team
                </h5>
                <div className="card-body">
                    <form ref={node => form = node} 
                        className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
                        <div className="form-group row">
                            <label htmlFor="firstName" className="col-md-3 col-form-label">
                                Team Name
                            </label>
                            <div className="col-md-4">
                                <input type="text" id="teamName" className="form-control"
                                    value={teamName}
                                    onChange={e => setTeamName(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
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

export default UpdateTeam;