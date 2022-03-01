import React from "react";
import DayListItem from "./DayListItem";

// Component that displays each day on the side bar ; 
export default function DayList(props) {
  const eachDay = props.days.map((day) => (
    <DayListItem
      key={day.id}
      name={props.value}
      setDay={() => props.onChange(day.name)}
      selected={props.value === day.name}
      {...day}/>
  ));
  return (
    <ul>
      {eachDay}
    </ul>
  );
}