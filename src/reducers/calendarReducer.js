import { initialState_cal } from "../initalState";

export const calendarReducer = (state=initialState_cal,action)=>{
    switch(action.type){

        case 'SET_ACTIVE':
            return{
                ...state,
                activeEvent: action.payload
            }
        case 'CLEAR_ACTIVE':
            return{
                ...state,
                activeEvent: action.payload
            }
        case 'UPDATE_EVENT':
            return{
                ...state,
                events: state.events.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                )
            }
        case 'ADD_NEW':
            return{
                ...state,
                events:[...state.events,action.payload]
            }
        
        case 'DELETE_EVENT':
            return{
                ...state,
                events: state.events.filter(
                    e => (e.id !== state.activeEvent.id)
                ),
                activeEvent: null
            
            }
        default: return state
    }
}