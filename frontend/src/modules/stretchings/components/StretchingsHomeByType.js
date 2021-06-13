import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';

import * as selectors from '../selectors';
import Stretchings from './Stretchings';
import {Pager} from '../../common';

const StretchingsHomeByType = () => {

    const stretchingsSearch = useSelector(selectors.getStretchingsSearch);
    const dispatch = useDispatch();
    const history = useHistory();
    const [page, setPage] = useState(0);
    const {stretchingType} = useParams();

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

    if(!stretchingsSearch){
        console.log("HOLA");
        dispatch(actions.findStretchingsByTypePage({page: page, stretchingType: stretchingType}));
        return "Loading...";
    } 

    const previousFindStretchingsByTypeResultPage = (dispatch) => {
        console.log("bajo " + page);
        setPage(page-1);
        console.log("bajada " + page);
        dispatch(actions.previousFindStretchingsByTypeResultPage(page));
    }

    const nextFindStretchingsByTypeResultPage = (dispatch) => {
        console.log("subo " + page);
        setPage(page+1);
        dispatch(actions.nextFindStretchingsByTypeResultPage(page));
    }







    const handleSetTypeStretching = (stretchingType, dispatch) => {
        dispatch(actions.findStretchingsByTypePage({page: 0, stretchingType: stretchingType}));
        history.push(`/stretchings/home/type/${stretchingType}`);
    }

    return(
        <div>
            <div>
                <div className="btn-group white-space mx-auto">
                    <div class="btn-group mr-5 mb-5 " role="group" aria-label="First group">
                        <button className="btn addplayer" onClick={() => history.push(`/stretchings/addStretching`)}>Add New Stretching</button>
                    </div>
                    <div class="btn-group mr-5 mb-5" role="group" aria-label="Fift group">
                        <div class="dropdown">
                            <button class="dropbtn lesion">Type Stretching 
                            <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content lesion">
                            <a type="button" onClick={() => handleSetTypeStretching(hamstrings, dispatch)}>Hamstrings</a>
                            <a type="button" onClick={() => handleSetTypeStretching(buttocks, dispatch)}>Buttocks</a>
                            <a type="button"  onClick={() => handleSetTypeStretching(calf, dispatch)}>Calf</a>
                            <a type="button" onClick={() => handleSetTypeStretching(adductors, dispatch)}>Adductors</a>
                            <a type="button" onClick={() => handleSetTypeStretching(shoulder, dispatch)}>Shoulder</a>
                            <a type="button" onClick={() => handleSetTypeStretching(quadriceps, dispatch)}>Quadriceps</a>
                            <a type="button" onClick={() => handleSetTypeStretching(back, dispatch)}>Back</a>
                            <a type="button"  onClick={() => handleSetTypeStretching(pectoral, dispatch)}>Pectoral</a>
                            <a type="button" onClick={() => handleSetTypeStretching(crotch, dispatch)}>Crotch</a>
                            <a type="button" onClick={() => handleSetTypeStretching(triceps, dispatch)}>Triceps</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Stretchings stretchings={stretchingsSearch.result.items}/>
                <Pager 
                back={{
                    enabled: stretchingsSearch.criteria.page >= 1,
                    onClick: () => previousFindStretchingsByTypeResultPage(stretchingType, dispatch) }}
                next={{
                    enabled: stretchingsSearch.result.existMoreItems,

                    onClick: () => nextFindStretchingsByTypeResultPage(stretchingType, dispatch)}}/>
            </div>
        </div>

    );

}

export default StretchingsHomeByType;