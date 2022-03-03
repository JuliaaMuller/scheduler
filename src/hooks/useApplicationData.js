import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useApplicationData() {

const [state, setState] = useState({day: "Monday", days: [], appointments: {}, interviewers: {}}); 

function setDay(day) {setState((prev) => ({ ...prev, day }))}; // To update the current day displayed ;

useEffect(() => {
  Promise.all([
    axios.get("/api/days"),
    axios.get("/api/appointments"),
    axios.get("/api/interviewers"),
  ])
  .then((all) => {
    const [days, appointments, interviewers] = all;
    // To update the last values for days appointments and interviewers from the API ; 
    setState((prev) => {
    return {
      ...prev,
      days: days.data,
      appointments: appointments.data,
      interviewers: interviewers.data,
    }
  });
  });
}, []);

function bookInterview (id, interview, edit) {
  const appointment = {...state.appointments[id], interview: { ...interview }};
  const appointments = {...state.appointments, [id]: appointment};
  return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview: { ...interview} }) // To add a new appointment in the database API ; 
  .then((response) => {
    setState((prev) => {
    return {...prev, appointments}
    });
    if (edit){
      return
    }
    updateSpots(id, -1);
  })
    // .catch((error) => console.log(error));
};

function cancelInterview(id) {
  const appointment = {...state.appointments[id], interview: null};
  const appointments = {...state.appointments, [id]: appointment};
  return axios.delete(`http://localhost:8001/api/appointments/${id}`) // To delete an appointment with its ID in the database API ; 
    .then((response) => {
      setState((prev) => ({...prev, appointments}));
      updateSpots(id, 1);
    })
    // .catch((error) => console.log(error));
};

function updateSpots(id, spotNum) {
  setState((prev) => ({
    ...prev, days: prev.days.map(day => day.appointments.includes(id) ? {...day, spots: day.spots + spotNum} : day)
  })); // Allows the App to update the spots remaining after a API response when deleting or booking interviews.
}
  return {state, setDay, bookInterview, cancelInterview};
};

 

