// import Appointment from "components/Appointment";
import "./styles.scss";
import React from 'react';

export default function Appointment(props) {
  const {time} = props
  return (props.time ?
    <article className="appointment">Appointment at {time}</article>
    :
    <article className="appointment">No appointment</article>
  )
}