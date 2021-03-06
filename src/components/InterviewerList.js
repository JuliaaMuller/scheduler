import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';
//CSS File
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  // Map into the database to render interviewers who are avalaible ; 
  const eachInterviewer = props.interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      setInterviewer={() => props.onChange(interviewer.id)}
      selected={props.value === interviewer.id}
      {...interviewer} />
  ));
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {eachInterviewer}
      </ul>
    </section>
  );
}