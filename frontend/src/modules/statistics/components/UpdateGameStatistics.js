import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';


const UpdateGameStatistics = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const gameStatistics = useSelector(selectors.getGameStatistics);

    const {gameId} = useParams();
    const [totalPoints, setTotalPoints] = useState(gameStatistics.totalPoints);
    const [durationMinutes, setDurationMinutes] = useState(gameStatistics.durationMinutes);
    const [totalThreePointShots, setTotalThreePointShots] = useState(gameStatistics.totalThreePointShots);
    const [totalSetShots, setTotalSetShots] = useState(gameStatistics.totalSetShots);
    const [totalFreeShots, setTotalFreeShots] = useState(gameStatistics.totalFreeShots);
    const [totalRebounds, setTotalRebounds] = useState(gameStatistics.totalRebounds);
    const [totalBlockedShot, setTotalBlockedShot] = useState(gameStatistics.totalBlockedShot);
    const [totalAssists, setTotalAssists] = useState(gameStatistics.totalAssists);
    const [totalPersonalFouls, setTotalPersonalFouls] = useState(gameStatistics.totalPersonalFouls);
    const [totalTechnicalFouls, setTotalTechnicalFouls] = useState(gameStatistics.totalTechnicalFouls);
    const [totalUnsportsmanlikeFouls, setTotalUnsportsmanlikeFouls] = useState(gameStatistics.totalUnsportsmanlikeFouls);

    const [totalPointsRival, setTotalPointsRival] = useState(gameStatistics.totalPointsRival);
    const [totalThreePointShotsRival, setTotalThreePointShotsRival] = useState(gameStatistics.totalThreePointShotsRival);
    const [totalSetShotsRival, setTotalSetShotsRival] = useState(gameStatistics.totalSetShotsRival);
    const [totalFreeShotsRival, setTotalFreeShotsRival] = useState(gameStatistics.totalFreeShotsRival);
    const [totalReboundsRival, setTotalReboundsRival] = useState(gameStatistics.totalReboundsRival);
    const [totalBlockedShotsRival, setTotalBlockedShotsRival] = useState(gameStatistics.totalBlockedShotsRival);
    const [totalAssistsRival, setTotalAssistsRival] = useState(gameStatistics.totalAssistsRival);
    const [totalPersonalFoulsRival, setTotalPersonalFoulsRival] = useState(gameStatistics.totalPersonalFoulsRival);
    const [totalTechnicalFoulsRival, setTotalTechnicalFoulsRival] = useState(gameStatistics.totalTechnicalFoulsRival);
    const [totalUnsportsmanlikeFoulsRival, setTotalUnsportsmanlikeFoulsRival] = useState(gameStatistics.totalUnsportsmanlikeFoulsRival);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = event => {

        event.preventDefault();
    
        if (form.checkValidity()) {
            
            dispatch(actions.updateGameStatistics(gameId, gameStatistics.id, totalPoints, durationMinutes, 
                totalThreePointShots,totalSetShots,totalFreeShots,totalRebounds,
                totalBlockedShot,totalAssists,totalPersonalFouls,totalTechnicalFouls,
                totalUnsportsmanlikeFouls,totalPointsRival,totalThreePointShotsRival,
                totalSetShotsRival,totalFreeShotsRival,totalReboundsRival,totalBlockedShotsRival,
                totalAssistsRival,totalPersonalFoulsRival,totalTechnicalFoulsRival,
                totalUnsportsmanlikeFoulsRival,
            () => reloadWindow(),
            errors => setBackendErrors(errors),
            ));
        } else {
            setBackendErrors(null);
            form.classList.add('was-validated');
            }
        }
        const reloadWindow = () =>{
            history(`/statistics/game/${gameId}`)
        }

        return(

            <div>
                <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
                <div className="card bg-light border-dark">
                    <h5 className="card-header">
                    <FormattedMessage id="project.statistics.fields.updateGameStatistics"/>
                    </h5>
                    <div className="card-body">
                        <form ref={node => form = node} 
                            className="needs-validation" noValidate onSubmit={e => handleSubmit(e)}>

                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalPoints"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalPoints" className="form-control"
                                        value={totalPoints}
                                        onChange={e => setTotalPoints(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.duration"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="durationMinutes" className="form-control"
                                        value={durationMinutes}
                                        onChange={e => setDurationMinutes(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalThreePointShots"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalThreePointShots" className="form-control"
                                        value={totalThreePointShots}
                                        onChange={e => setTotalThreePointShots(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalSetShots"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalSetShots" className="form-control"
                                        value={totalSetShots}
                                        onChange={e => setTotalSetShots(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalFreeShots"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalFreeShots" className="form-control"
                                        value={totalFreeShots}
                                        onChange={e => setTotalFreeShots(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalRebounds"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalRebounds" className="form-control"
                                        value={totalRebounds}
                                        onChange={e => setTotalRebounds(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalBlockedShot"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalBlockedShot" className="form-control"
                                        value={totalBlockedShot}
                                        onChange={e => setTotalBlockedShot(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalAssists"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalAssists" className="form-control"
                                        value={totalAssists}
                                        onChange={e => setTotalAssists(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalPersonalFouls"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalPersonalFouls" className="form-control"
                                        value={totalPersonalFouls}
                                        onChange={e => setTotalPersonalFouls(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalTechnicalFouls"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalTechnicalFouls" className="form-control"
                                        value={totalTechnicalFouls}
                                        onChange={e => setTotalTechnicalFouls(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalUnsportsmanlikeFouls"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalUnsportsmanlikeFouls" className="form-control"
                                        value={totalUnsportsmanlikeFouls}
                                        onChange={e => setTotalUnsportsmanlikeFouls(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>









                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalPointsRival"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalPointsRival" className="form-control"
                                        value={totalPointsRival}
                                        onChange={e => setTotalPointsRival(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalThreePointShotsRival"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalThreePointShotsRival" className="form-control"
                                        value={totalThreePointShotsRival}
                                        onChange={e => setTotalThreePointShotsRival(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalSetShotsRival"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalSetShotsRival" className="form-control"
                                        value={totalSetShotsRival}
                                        onChange={e => setTotalSetShotsRival(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalFreeShotsRival"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalFreeShotsRival" className="form-control"
                                        value={totalFreeShotsRival}
                                        onChange={e => setTotalFreeShotsRival(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalReboundsRival"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalReboundsRival" className="form-control"
                                        value={totalReboundsRival}
                                        onChange={e => setTotalReboundsRival(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalBlockedShotRival"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalBlockedShotsRival" className="form-control"
                                        value={totalBlockedShotsRival}
                                        onChange={e => setTotalBlockedShotsRival(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalAssistsRival"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalAssistsRival" className="form-control"
                                        value={totalAssistsRival}
                                        onChange={e => setTotalAssistsRival(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalPersonalFoulsRival"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalPersonalFoulsRival" className="form-control"
                                        value={totalPersonalFoulsRival}
                                        onChange={e => setTotalPersonalFoulsRival(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalTechnicalFoulsRival"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalTechnicalFoulsRival" className="form-control"
                                        value={totalTechnicalFoulsRival}
                                        onChange={e => setTotalTechnicalFoulsRival(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="firstName" className="col-md-6 col-form-label">
                                <FormattedMessage id="project.statistics.fields.totalUnsportsmanlikeFoulsRival"/>
                                </label>
                                <div className="col-md-6">
                                    <input  type="text" id="totalUnsportsmanlikeFoulsRival" className="form-control"
                                        value={totalUnsportsmanlikeFoulsRival}
                                        onChange={e => setTotalUnsportsmanlikeFoulsRival(e.target.value)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div className="form-group row">
                                <div className="offset-md-5 col-md-1">
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

export default UpdateGameStatistics;