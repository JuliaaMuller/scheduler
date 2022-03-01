import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import { getInterviewersForDay } from "helpers/selectors";
import "components/Appointment/styles.scss";


// Define all the mode to be displayed in each schedule case ; To switch modes ; 
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment (props) {
  const { time, interview, state, bookInterview, id, cancelInterview } = props;
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY); // Initial mode ;

  function save(name, interviewer) {
    const interview = {student: name, interviewer};
    transition(SAVING);
      bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
  }; // To save a new appointment or an edited one ; 
  
  function deleteApt(){transition(CONFIRM)}; // To switch from the delete button to the confirm mode ; 

  function edit(){transition(EDIT)}; // To switch from the edit button to the edit mode ;

  function confirmDelete(id) {
    transition(DELETING, true);
     cancelInterview(id)
     .then(() => transition(EMPTY))
     .catch(() => transition(ERROR_DELETE, true))
  }; // To confirm the delete appointment ; 

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
      {mode === DELETING && <Status message={"Deleting..."} />}
      {mode === EDIT && 
        <Form
          interviewers={getInterviewersForDay(state, state.day)}
          onCancel={back}
          onSave={save}
          student={interview.student}
          interviewer={interview.interviewer.id}
        />}
        {mode === ERROR_SAVE &&
        <Error message = {ERROR_SAVE} onClose={back}
        />}
         {mode === ERROR_DELETE &&
        <Error message = {ERROR_DELETE} onClose={back}
        />}
    </article>
  );
};
