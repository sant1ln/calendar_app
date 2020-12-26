import {initialState_ui} from '../initalState'

export const uiReducer = (state = initialState_ui,action) =>{
    switch(action.type){
        case 'OPEN_MODAL':
            return {
                ...state,
                modalOpen: true
            }
        case 'CLOSE_MODAL':
            return{
                ...state,
                modalOpen: false,
            }
        default: return state
    }
}