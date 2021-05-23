import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import {useParams} from 'react-router-dom';


const UpdatePlay = () => {

    const play = useSelector(selectors.getPlay);
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState(play.title);
    const [playType, setPlayType] = useState(play.playType);
    const [gesture, setGesture] = useState(play.gesture);
    const [pointGuardText, setPointGuardText] = useState(play.pointGuardText);
    const [shootingGuardText, setShootingGuardText] = useState(play.shootingGuardText);
    const [smallForwardText, setSmallForwardText] = useState(play.smallForwardText);
    const [powerForwardText, setPowerForwardText] = useState(play.powerForwardText);
    const [centerText, setCenterText] = useState(play.centerText);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const attack = "Attack";
    const defense = "Defense";

    const handleSubmit = event => {

        event.preventDefault();
    
        if (form.checkValidity()) {
            
            dispatch(actions.updatePlay(play.id, title.trim(), playType,
            gesture.trim(), pointGuardText.trim(), shootingGuardText.trim(), smallForwardText.trim(), powerForwardText.trim(), centerText.trim(),
            () => reloadWindow(id),
            errors => setBackendErrors(errors),
            ));
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
            }
        }

        const reloadWindow = (id) =>{
            history.push(`/plays/home/${id}`);
            window.location.reload('true');
        }

        return(

            <div>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <div className="card bg-dark text-light border-dark">
                    <h5 className="">
                        Update Play
                    </h5>
                    <div className="card-body">
                        <form ref={node => form = node} 
                            className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                    Title
                                </label>
                                <div className="col-md-9">
                                    <input type="text" id="title" className="form-control"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className=" row">
                                <label htmlFor="firstName" className="col-md-5 col-form-label">
                                    Type
                                    </label>
                                <div class="dropdown col-md-6">
                                    <button class="dropbtn">{playType} 
                                    <i class="fa fa-caret-down"></i>
                                    </button>
                                    <div class="dropdown-content">
                                    <a type="button" onClick={() => setPlayType(attack)} >Attack</a>
                                    <a type="button" onClick={() => setPlayType(defense)} >Defense</a>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-12 col-form-label">
                                Gesture
                                </label>
                                <div className="col-md-12">
                                    <textarea type="text" id="gesture" className="form-control"
                                        value={gesture}
                                        onChange={e => setGesture(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-12 col-form-label">
                                PointGuard Text
                                </label>
                                <div className="col-md-12">
                                    <textarea  type="text" id="pointGuardText" className="form-control"
                                        value={pointGuardText}
                                        onChange={e => setPointGuardText(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-12 col-form-label">
                                ShootingGuard Text
                                </label>
                                <div className="col-md-12">
                                    <textarea  type="text" id="shootingGuardText" className="form-control"
                                        value={shootingGuardText}
                                        onChange={e => setShootingGuardText(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-12 col-form-label">
                                SmallForward Text
                                </label>
                                <div className="col-md-12">
                                    <textarea  type="text" id="smallForwardText" className="form-control"
                                        value={smallForwardText}
                                        onChange={e => setSmallForwardText(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-12 col-form-label">
                                PowerForwardText
                                </label>
                                <div className="col-md-12">
                                    <textarea  type="text" id="powerForwardText" className="form-control"
                                        value={powerForwardText}
                                        onChange={e => setPowerForwardText(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-12 col-form-label">
                                CenterText
                                </label>
                                <div className="col-md-12">
                                    <textarea  type="text" id="centerText" className="form-control"
                                        value={centerText}
                                        onChange={e => setCenterText(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
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

export default UpdatePlay;