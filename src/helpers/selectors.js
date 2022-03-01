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
  interview.interviewer = { ...state.interviewers[interview.interviewer]}
 //change and "destruct" the interviewer value inside the interview argument with the full interviewer object
  return interview
}

export function getInterviewersForDay(state, day) {
  const clickedDay = state.days.find((dayName) => dayName.name === day);
  
  if (clickedDay) {
    return clickedDay.interviewers.map(id => state.interviewers[id]);
  }
  return [];
}; 
