import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Swal from "sweetalert2";

import "./styles/modal.css";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../actions/ui";
import { clearActive, eventAddNew, updatedEvent } from "../actions/events";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
  },
};
Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const end = moment().minutes(0).seconds(0).add(2, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  endF: end.toDate(),
};

export const CalendarModal = () => {
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);
  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(end.toDate());

  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(initEvent);

  const { title, notes, start, endF } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    }
  }, [activeEvent, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      /* valores computados */
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    setFormValues(initEvent);
    dispatch(clearActive());
  };

  const handleStartDate = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleEndDate = (e) => {
    setDateEnd(e);
    setFormValues({
      ...formValues,
      endF: e,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(endF);
    if (momentStart.isSameOrAfter(momentEnd)) {
      console.log("i´m here!");
      return Swal.fire(
        "Error",
        "La fecha final debe de ser despues del inicio",
        "error"
      );
    }
    if (title.trim().length < 2) {
      return Swal.fire("Error", "Ingresa un titulo", "error");
    }
    if (activeEvent) {
      dispatch(updatedEvent(formValues));
    } else {
      dispatch(
        eventAddNew({
          ...formValues,
          id: new Date().getTime(),
          user: {
            _id: "123",
            name: "Santiago",
          },
        })
      );
    }
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      /* onAfterOpen={afterOpenModal} */
      onRequestClose={closeModal}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form onSubmit={handleSubmitForm} className="container">
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDate}
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDate}
            value={dateEnd}
            minDate={dateStart}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título del evento"
            name="title"
            value={title}
            autoComplete="off"
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
