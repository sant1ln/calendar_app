import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { CalendarEvent } from "./CalendarEvent";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../actions/ui";
import { clearActive, deleteEvent, setActive } from "../actions/events";
import { AddNewFab } from "./AddNewFab";

const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {
  const { events,activeEvent } = useSelector((state) => state.calendar);
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );
  const dispatch = useDispatch();

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
    dispatch(setActive(e))
  };

  const onSelectEvent = (e) => {
    dispatch(setActive(e))
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const handleDelete = () =>{
    dispatch(deleteEvent())
  }

  const onSelectSlot = (e) =>{
    dispatch(clearActive())
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367cf7",
      borderRadius: "0px",
      opacity: "0.8",
      display: "block",
      color: "white",
    };

    return style;
  };

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="endF"
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        onSelectSlot={onSelectSlot}

        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />
      {activeEvent && 
      <button onClick={handleDelete}
      className="btn btn-danger fab-danger"
      >Delete</button>}
      
      <AddNewFab />
      <CalendarModal />
    </div>
  );
};
