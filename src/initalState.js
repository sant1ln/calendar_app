import moment from 'moment'
export const initialState_ui = {
   modalOpen: false,
}

export const initialState_cal = {
    events: [
        {   
            id: new Date().getTime(),
            title: "Cumpleaños",
            start: moment().toDate(),
            endF: moment().add(2, "hours").toDate(),
            bgcolor: "#fafafa",
            notes: "Comprar pastel",
            user: {
                _id: "123",
                name: "Santiago",
            },
        },
    ],
    activeEvent: null,
}