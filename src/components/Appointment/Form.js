import React from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

export default function Form (props) {
  
  return (
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={props.value && props.student}
      />
    </form>
    <InterviewerList interviewers={props.interviewers} value={props.value}/>
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onCancel={props.onCancel}>Cancel</Button>
      <Button confirm onSave={props.onSave}>Save</Button>
    </section>
  </section>
</main>
  );
}

