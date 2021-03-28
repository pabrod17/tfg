import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useHistory} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';


const AddSeason = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [calendario, setCalendario] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {
        event.preventDefault();
        if (form.checkValidity()) {

            dispatch(actions.addSeason({
                startDate: startDate,
                endDate: endDate,
                calendario: calendario.trim()
            }, () => reloadWindow(),
                errors => setBackendErrors(errors),
            ));

        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
        }
    }

    const reloadWindow = () =>{
        history.push('/seasons/new');
        window.location.reload('true');
    }

    return(
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <div className="card bg-light border-dark centrado-update-add">
                <h5 className="card-header">
                    New Season
                </h5>
                <div className="card-body">
                    <form ref={node => form = node}
                        className="needs-validation" noValidate 
                        onSubmit={e => handleSubmit(e)}>
                        <div className="form-group row">
                            <label htmlFor="startDate" className="col-md-4 col-form-label">
                                Start Date
                            </label>
                            <div className="col-md-5">
                                <input type="date" id="startDate" className="form-control"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="endDate" className="col-md-4 col-form-label">
                                End Date
                            </label>
                            <div className="col-md-5">
                                <input type="date" id="endDate" className="form-control"
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="calendario" className="col-md-4 col-form-label">
                                Calendario
                            </label>
                            <div className="col-md-5">
                                <input type="text" id="calendario" className="form-control"
                                    value={calendario}
                                    onChange={e => setCalendario(e.target.value)}
                                    autoFocus
                                    required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="offset-md-5 col-md-8">
                                <button type="submit" className="btn btn-primary">
                                    Add
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default AddSeason;