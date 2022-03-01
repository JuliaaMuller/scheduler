import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import { getInterviewersForDay } from "helpers/selectors";
import "components/Appointment/styles.scss";
import Status from "./Status";

// Define all the mode to be displayed in each schedule case ; To switch modes ; 
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const EDIT = "EDIT";

export default function Appointment (props) {
  const { time, interview, state, bookInterview, id, deleteItw } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY); // Initial mode ;

  function save(name, interviewer) {
    const interview = {student: name, interviewer};
    transition(SAVING);
    setTimeout(() => {
      bookInterview(id, interview);
      transition(SHOW);
    }, 1000);
  }; // To save a new appointment or an edited one ; and simulate the response time ; 

  function deleteApt(){transition(CONFIRM)}; // To switch from the delete button to the confirm mode ; 

  function edit(){transition(EDIT)}; // To switch from the edit button to the edit mode ;

  function confirmDelete(id) {
    transition(DELETE);
    setTimeout(() => {
      deleteItw(id);
      transition(EMPTY);
    }, 1000);
  }; // // To confirm the delete appointment ; and simulate the response time ; 

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && 
      <Show onDelete={deleteApt} {...interview} id={id} onEdit={edit} />}
      {mode === CREATE && 
        <Form
          interviewers={getInterviewersForDay(state, state.day)}
          onCancel={back}
          onSave={save}
        />}
      {mode === SAVING && <Status message={"Saving..."} />}
      {mode === CONFIRM && 
        <Confirm
          message={"Are you sure that you want to delete this appointement?"}
          onConfirm={confirmDelete}
          id={id}
        />}
      {mode === DELETE && <Status message={"Deleting..."} />}
      {mode === EDIT && 
        <Form
          interviewers={getInterviewersForDay(state, state.day)}
          onCancel={back}
          onSave={save}
          student={interview.student}
          interviewer={interview.interviewer.id}
        />}
    </article>
  );
};
