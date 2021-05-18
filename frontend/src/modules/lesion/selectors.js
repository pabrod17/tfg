const getModuleState = state => state.lesion;

export const getOneLesion = state =>
    getModuleState(state).lesion;

export const getAllLesion = state =>
    getModuleState(state);