import "./styles.scss";
import React from 'react';
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
export default function Appointment(props) {
  const {time, interview} = props
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      {props.time ? <Header time={time}/> : "No appointment"}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form onCancel={() => back(EMPTY)}
          interviewers={[]}
        />
      )}
      </article>
  )
}