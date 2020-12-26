import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../actions/ui'
import './styles/modal.css'

export const AddNewFab = () => {
    const dispatch = useDispatch()
    const openModal = () =>{    
        dispatch(uiOpenModal())
    }

    return (
        <button
            onClick={openModal}
            className="btn btn-primary fab"
        >
            Create
        </button>
    )
}
