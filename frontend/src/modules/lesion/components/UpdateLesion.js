import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';

const UpdateLesion = () => {

    const lesion = useSelector(selectors.getOneLesion);
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [lesionName, setLesionName] = useState(lesion.lesionName);
    const [description, setDescription] = useState(lesion.description);
    const [medication, setMedication] = useState(lesion.medication);
    const [lesionType, setLesionType] = useState(lesion.lesionType);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();
    
        if (form.checkValidity()) {
            
            dispatch(actions.updateLesion(lesion.id, lesionName.trim(), 
            description.trim(), medication.trim(), lesionType,
            () => reloadWindow(),
            errors => setBackendErrors(errors),
            ));
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
            }
        }

        const reloadWindow = () =>{
            history.push(`/lesion/home`);
            window.location.reload('true');
        }

        const muscle = "Muscle";
        const tendon = "Tendon";
        const joint = "Joint";
        const spine = "Spine";
        const psychological  = "Psychological";

        return(

            <div>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <div className="card bg-light border-dark centrado-update-add">
                    <h5 className="card-header">
                        Update Lesion
                    </h5>
                    <div className="card-body">
                        <form ref={node => form = node} 
                            className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                    Lesion Name
                                </label>
                                <div className="col-md-9">
                                    <input type="text" id="lesionName" className="form-control"
                                        value={lesionName}
                                        onChange={e => setLesionName(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-12 col-form-label">
                                Description
                                </label>
                                <div className="col-md-12">
                                    <textarea  type="text" id="description" className="form-control"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-12 col-form-label">
                                Medication
                                </label>
                                <div className="col-md-12">
                                    <textarea type="text" id="medication" className="form-control"
                                        value={medication}
                                        onChange={e => setMedication(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className=" row">
                            <label htmlFor="firstName" className="col-md-5 col-form-label">
                                    Lesion Type
                                </label>
                            <div class="dropdown col-md-6">
                                <button class="dropbtn">{lesionType} 
                                <i class="fa fa-caret-down"></i>
                                </button>
                                <div class="dropdown-content">
                                <a type="button" onClick={() => setLesionType(muscle)} >Muscle</a>
                                <a type="button" onClick={() => setLesionType(tendon)} >Tendon</a>
                                <a type="button" onClick={() => setLesionType(joint)} >Joint</a>
                                <a type="button" onClick={() => setLesionType(spine)} >Spine</a>
                                <a type="button" onClick={() => setLesionType(psychological)} >Psychological</a>
                                </div>
                            </div>
                            </div>
                            <div className="form-group row">
                                <div className="offset-md-8 col-md-1">
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

export default UpdateLesion;