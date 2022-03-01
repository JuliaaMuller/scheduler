import React, { Fragment, useState, useEffect } from "react";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import DayList from "./DayList";
import Appointment from "./Appointment";
import "components/Application.scss";
import axios from "axios";
import useApplicationData from "hooks/useApplicationData";

export default function Application () {
  const {state, setDay, bookInterview, cancelInterview} = useApplicationData();
  const appointementByDay = getAppointmentsForDay(state, state.day); // To show all the appointments for a selected day ; 
  const interviewersByDay = getInterviewersForDay(state, state.day);
  
  const eachAppointement = appointementByDay.map((appointment) => {
    const interview = getInterview(state, appointment.interview); // To find an interview with its ID ;
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersByDay}
        state={state}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <Fragment>
          {eachAppointement}
          <Appointment key="last" time="5pm" />
        </Fragment>
      </section>
    </main>
  );
};
