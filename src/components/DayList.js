
import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const daily = props.days.map(days => <DayListItem key={days.id} name={days.name} spots={days.spots} selected={days.name === props.day} setDay={props.setDay} {...days}/>);
                           
  return (
    <ul>
      {daily}
    </ul>
  );
}

