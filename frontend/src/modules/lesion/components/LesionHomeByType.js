import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import * as actions from '../actions';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';

import * as selectors from '../selectors';
import Lesions from './Lesions';
import {Pager} from '../../common';

const LesionHomeByType = () => {

    const lesionsSearch = useSelector(selectors.getLesionsSearch);
    const dispatch = useDispatch();
    const history = useHistory();
    const [page, setPage] = useState(0);
    const {lesionType} = useParams();

    const muscle = "Muscle";
    const tendon = "Tendon";
    const joint = "Joint";
    const spine = "Spine";
    const psychological  = "Psychological";

    if(!lesionsSearch){
        console.log("HOLA");
        dispatch(actions.findLesionByTypePage({page: page, lesionType: lesionType}));
        
        return "Loading...";

    } 

    const previousFindLesionByTypeResultPage = (lesionType, dispatch) => {
        setPage(page-1);
        dispatch(actions.previousFindLesionByTypeResultPage(lesionType, page));
    }

    const nextFindLesionByTypeResultPage = (lesionType, dispatch) => {
        setPage(page+1);
        dispatch(actions.nextFindLesionByTypeResultPage(lesionType, page));
    }

    const handleSetTypeLesion = (lesionType, dispatch) => {
        dispatch(actions.findLesionByTypePage({page: page, lesionType: lesionType}));
        history.push(`/lesion/home/type/${lesionType}`);
    }
    // console.log("hola --> " +lesionsSearch.criteria.page );

    return(
        <div>
            <div>
                <div className="btn-group white-space mx-auto">
                    <div class="btn-group mr-5 mb-5 " role="group" aria-label="First group">
                        <button className="btn addplayer" onClick={() => history.push(`/lesion/addLesion`)}>Add New Lesion</button>
                    </div>
                    <div class="btn-group mr-5 mb-5" role="group" aria-label="Fift group">
                        <div class="dropdown">
                            <button class="dropbtn lesion">Type Lesion 
                            <i class="fa fa-caret-down"></i>
                            </button>
                            <div class="dropdown-content lesion">
                            <a type="button" onClick={() => handleSetTypeLesion(muscle, dispatch)}>Muscle</a>
                            <a type="button" onClick={() => handleSetTypeLesion(tendon, dispatch)}>Tendon</a>
                            <a type="button"  onClick={() => handleSetTypeLesion(joint, dispatch)}>Joint</a>
                            <a type="button" onClick={() => handleSetTypeLesion(spine, dispatch)}>Spine</a>
                            <a type="button" onClick={() => handleSetTypeLesion(psychological, dispatch)}>Psychological</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Lesions lesions={lesionsSearch.result.items}/>
                <Pager 
                back={{
                    enabled: lesionsSearch.criteria.page >= 1,
                    onClick: () => previousFindLesionByTypeResultPage(lesionType, dispatch) }}
                next={{
                    enabled: lesionsSearch.result.existMoreItems,

                    onClick: () => nextFindLesionByTypeResultPage(lesionType, dispatch)}}/>
            </div>
        </div>

    );

}

export default LesionHomeByType;