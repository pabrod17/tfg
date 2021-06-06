import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useHistory} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import {useParams} from 'react-router-dom';

const AddExercise = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [exerciseName, setExerciseName] = useState("");
    const [description, setDescription] = useState("");
    const [objective, setObjective] = useState("");
    const [exerciseType, setExerciseType] = useState("");
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();
    
        if (form.checkValidity()) {
            
            dispatch(actions.addExercise(exerciseName.trim(), 
            description.trim(), objective.trim(), exerciseType,
            () => reloadWindow(),
            errors => setBackendErrors(errors),
            ));
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
            }
        }
        const reloadWindow = () =>{
            history.push('/exercises/addExercise');
            window.location.reload('true');
        }

        const tactic = "Tactic";
        const technique = "Technique";
        const physical = "Physical";
        const globalized = "Globalized";
        const specific  = "Specific";
        const psychological = "Psychological";
        const strategy = "Strategy";
        const preMatch = "PreMatch";

        return(

            <div>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <div className="card bg-light border-dark centrado-update-add">
                    <h5 className="card-header">
                        Add Exercise
                    </h5>
                    <div className="card-body">
                        <form ref={node => form = node} 
                            className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                Exercise Name
                                </label>
                                <div className="col-md-9">
                                    <input type="text" id="exerciseName" className="form-control"
                                        value={exerciseName}
                                        onChange={e => setExerciseName(e.target.value)}
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
                                Objective
                                </label>
                                <div className="col-md-12">
                                    <textarea  type="text" id="objective" className="form-control"
                                        value={objective}
                                        onChange={e => setObjective(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className=" row">
                            <label htmlFor="firstName" className="col-md-5 col-form-label">
                                Exercise Type
                                </label>
                            <div class="dropdown col-md-6">
                                <button class="dropbtn">{exerciseType} 
                                <i class="fa fa-caret-down"></i>
                                </button>
                                <div class="dropdown-content">
                                    <a type="button" onClick={() => setExerciseType(tactic, dispatch)}>Tactic</a>
                                    <a type="button" onClick={() => setExerciseType(technique, dispatch)}>Technique</a>
                                    <a type="button" onClick={() => setExerciseType(physical, dispatch)}>Physical</a>
                                    <a type="button" onClick={() => setExerciseType(globalized, dispatch)}>Globalized</a>
                                    <a type="button" onClick={() => setExerciseType(specific, dispatch)}>Specific</a>
                                    <a type="button" onClick={() => setExerciseType(psychological, dispatch)}>Psychological</a>
                                    <a type="button" onClick={() => setExerciseType(strategy, dispatch)}>Strategy</a>
                                    <a type="button" onClick={() => setExerciseType(preMatch, dispatch)}>PreMatch</a>
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

export default AddExercise;