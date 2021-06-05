import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';

const UpdateStretching = () => {
    const stretching = useSelector(selectors.getOneStretching);
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [stretchingName, setStretchingName] = useState(stretching.stretchingName);
    const [description, setDescription] = useState(stretching.description);
    const [stretchingType, setStretchingType] = useState(stretching.stretchingType);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();
    
        if (form.checkValidity()) {
            
            dispatch(actions.updatStretching(stretching.id, stretchingName.trim(), 
            description.trim(), stretchingType,
            () => reloadWindow(),
            errors => setBackendErrors(errors),
            ));
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
            }
        }

        const reloadWindow = () =>{
            history.push(`/stretchings/home`);
            window.location.reload('true');
        }

        const hamstrings = "Hamstrings";
        const buttocks = "Buttocks";
        const calf = "Calf";
        const adductors = "Adductors";
        const shoulder  = "Shoulder";
        const quadriceps = "Quadriceps";
        const back = "Back";
        const pectoral = "Pectoral";
        const crotch = "Crotch";
        const triceps  = "Triceps";

        return(

            <div>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <div className="card bg-light border-dark centrado-update-add">
                    <h5 className="card-header">
                        Update Stretching
                    </h5>
                    <div className="card-body">
                        <form ref={node => form = node} 
                            className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                    Stretching Name
                                </label>
                                <div className="col-md-9">
                                    <input type="text" id="stretchingName" className="form-control"
                                        value={stretchingName}
                                        onChange={e => setStretchingName(e.target.value)}
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
                            <div className=" row">
                            <label htmlFor="firstName" className="col-md-5 col-form-label">
                                    Stretching Type
                                </label>
                            <div class="dropdown col-md-6">
                                <button class="dropbtn">{stretchingType} 
                                <i class="fa fa-caret-down"></i>
                                </button>
                                <div class="dropdown-content">
                                <a type="button" onClick={() => setStretchingType(hamstrings)} >Hamstrings</a>
                                <a type="button" onClick={() => setStretchingType(buttocks)} >Buttocks</a>
                                <a type="button" onClick={() => setStretchingType(calf)} >Calf</a>
                                <a type="button" onClick={() => setStretchingType(adductors)} >Adductors</a>
                                <a type="button" onClick={() => setStretchingType(shoulder)} >Shoulder</a>
                                <a type="button" onClick={() => setStretchingType(quadriceps)} >Quadriceps</a>
                                <a type="button" onClick={() => setStretchingType(back)} >Back</a>
                                <a type="button" onClick={() => setStretchingType(pectoral)} >Pectoral</a>
                                <a type="button" onClick={() => setStretchingType(crotch)} >Crotch</a>
                                <a type="button" onClick={() => setStretchingType(triceps)} >Triceps</a>
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

export default UpdateStretching;