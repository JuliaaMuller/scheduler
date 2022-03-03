export function getAppointmentsForDay(state, day) {
  let result = [];
  if (!day) {
    return result;
  }
  for (let index of state.days) {
    if (index.name === day) {
      for (let id of index.appointments) {
        result.push(state.appointments[id]);
      }
    }
  }
  return result;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
 // Change and "destruct" the interviewer value inside the interview argument with the full interviewer object ;
  return {
    student:interview.student, 
    interviewer:state.interviewers[interview.interviewer]
  };
}

export function getInterviewersForDay(state, day) {
  let result =[];
  const clickedDay = state.days.find((item) => item.name === day);
  if (!clickedDay) {
    return result;
  }
  clickedDay.interviewers.forEach(id => { result.push(state.interviewers[id])});
  return result;
}; 
