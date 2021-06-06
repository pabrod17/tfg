const getModuleState = state => state.exercises;

export const getOneExercise = state =>
    getModuleState(state).exercise;

export const getAllExercises = state =>
    getModuleState(state);