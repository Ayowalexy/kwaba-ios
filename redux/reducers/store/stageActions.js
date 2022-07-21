import { STAGE_TYPES } from "./stageTypes";
import { createAction } from "../createActions";


export const setCurrentStage = (stage) => 
    createAction(STAGE_TYPES.SET_CURRENT_STAGE, stage)
