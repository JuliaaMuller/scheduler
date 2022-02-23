import "./styles.scss";
import React from 'react';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  const {time, interview} = props
  return (
    <article className="appointment">
      {props.time ? <Header time = {time}/> : "No appointment"}
      {props.interview ? <Show student ={interview.student} interviewers={interview.interviewer} /> : <Empty />}
      </article>
    
   
  )
}