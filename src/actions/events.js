
export const eventAddNew = (event) => ({
    type: 'ADD_NEW',
    payload: event
})

export const setActive = (event) => ({
    type: 'SET_ACTIVE',
    payload: event
})

export const clearActive = () =>({
    type: 'CLEAR_ACTIVE',
    payload: null
})

export const updatedEvent = (e) => ({
    type: 'UPDATE_EVENT',
    payload: e
})

export const deleteEvent = (id) =>({
    type: 'DELETE_EVENT',
})