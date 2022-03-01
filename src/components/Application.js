import React, { Fragment, useState, useEffect } from "react";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";
import DayList from "./DayList";
import Appointment from "./Appointment";
import "components/Application.scss";
import axios from "axios";

export default function Application () {
  function setDay(day) {setState((prev) => ({ ...prev, day }))}; // To update the current day displayed ; 

  const [state, setState] = useState({day: "Monday", days: [], appointments: {}, interviewers: {}}); 
  
  const appointementByDay = getAppointmentsForDay(state, state.day); // To show all the appointments for a selected day ; 

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
    .then((all) => {
      const [days, appointments, interviewers] = all;
      // To update the last values for days appointments and interviewers from the API ; 
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  function bookInterview (id, interview) {
    const appointment = {...state.appointments[id], interview: { ...interview }};
    const appointments = {...state.appointments, [id]: appointment};
    axios.put(`/api/appointments/${id}`, { ...appointment }) // To add a new appointment in the database API ; 
      .then((response) => {})
      .catch((error) => console.log(error));
    setState({...state, appointments}); 
  };

  function deleteItw (id) {
    const appointment = {...state.appointments[id], interview: null};
    const appointments = {...state.appointments, [id]: appointment};
    axios.delete(`api/appointments/${id}`, { ...appointment }) // To delete an appointment with its ID in the database API ; 
      .then((response) => {})
      .catch((error) => console.log(error));
    setState({...state, appointments});
  };

  const eachAppointement = appointementByDay.map((appointment) => {
    const interview = getInterview(state, appointment.interview); // To find an interview within its ID ;
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        state={state}
        bookInterview={bookInterview}
        deleteItw={deleteItw}
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
