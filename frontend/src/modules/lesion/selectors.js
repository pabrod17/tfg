const getModuleState = state => state.players;

export const getOneLesion = state =>
    getModuleState(state).lesion;

export const getAllLesion = state =>
    getModuleState(state);