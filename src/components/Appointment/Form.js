import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

// Component for the CREATE and EDIT mode.
export default function Form (props) {
  
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // Reset function that reinitialize student and interviewer when the cancel button is clicked
  function reset() {
    setStudent("");
    setInterviewer(null);
  };

  function cancel() {
    reset();
    setError("");
    props.onCancel();
  };

  // Handle the submit action when Save is clicked and check if neither Student nor Interviewer are empty
  function submit(event) {
    event.preventDefault();
    if (!student) {
    setError("Student name cannot be blank");
    return
    }
    if (!interviewer) {
    setError("You must select an interviewer");
    return 
    }
    setError("");
    props.onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"/>
            <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer}/>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={submit}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};
