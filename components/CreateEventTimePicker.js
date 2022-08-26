import React, { useEffect, useState, useContext } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

import CreatableSelect from "react-select/creatable";
import "../App.css";

export default function Timepicker() {
  const {
    startDaySelected,
    endDaySelected,
    setStartDaySelected,
    setEndDaySelected,
    
  } = useContext(GlobalContext);

  const [eventStart, setEventStart] = useState(dayjs(startDaySelected));
  const [date, setDate] = useState(dayjs());
  const [newDate, setNewDate] = useState(dayjs("2022-07-21T18:30:00.000Z"));
  const [temp, setTemp] = useState([]);

  //console.log(newDate)
  const [min, setMin] = useState(
    eventStart.minute() > 0 && eventStart.minute() < 30
      ? date.set("minute", 30).format("HH:mm")
      : date
          .set("minute", 0)
          .set("hour", date.hour() + 1)
          .format("HH:mm")
  );

  const options = [
    { value: "09:00", label: "09:00" },
    { value: "09:30", label: "09:30" },
    { value: "10:00", label: "10:00" },
    { value: "10:30", label: "10:30" },
    { value: "11:00", label: "11:00" },
    { value: "11:30", label: "11:30" },
    { value: "12:00", label: "12:00" },
    { value: "12:30", label: "12:30" },
    { value: "13:00", label: "13:00" },
    { value: "13:30", label: "13:30" },
    { value: "14:00", label: "14:00" },
    { value: "14:30", label: "14:30" },
    { value: "15:00", label: "15:00" },
    { value: "15:30", label: "15:30" },
    { value: "16:00", label: "16:00" },
    { value: "16:30", label: "16:30" },
    { value: "17:00", label: "17:00" },
    { value: "17:30", label: "17:30" },
    { value: "18:00", label: "18:00" },
    { value: "18:30", label: "18:30" },
    { value: "19:00", label: "19:00" },
    { value: "19:30", label: "19:30" },
    { value: "22:00", label: "22:00" },
    { value: "22:30", label: "22:30" },
    { value: "23:00", label: "23:00" },
    { value: "23:30", label: "23:30" },
    { value: "00:00", label: "00:00" },
    { value: "00:30", label: "00:30" },
    { value: "01:00", label: "01:00" },
    { value: "01:30", label: "01:30" },
    { value: "02:00", label: "02:00" },
    { value: "02:30", label: "02:30" },
    { value: "03:00", label: "03:00" },
    { value: "03:30", label: "03:30" },
    { value: "04:00", label: "04:00" },
    { value: "04:30", label: "04:30" },
    { value: "05:00", label: "05:00" },
    { value: "05:30", label: "05:30" },
    { value: "06:00", label: "06:00" },
    { value: "06:30", label: "06:30" },
    { value: "07:00", label: "07:00" },
    { value: "07:30", label: "07:30" },
    { value: "08:00", label: "08:00" },
    { value: "08:30", label: "08:30" },
  ];


  function handleChange(newValue, actionMeta) {
    //console.group("Value Changed");
    console.log(newValue);
    console.log(newValue.value.length);
    //console.log(`action: ${actionMeta.action}`);
    //console.groupEnd();
    //console.log(selected.value);
    if (
      newValue.value.length <= 2 ||
      newValue.value / 100 >= 1 ||
      newValue.value.includes(".") ||
      (newValue.value >= 24 && newValue.value < 0)
    ) {
      alert("enter correct time");

      //setTemp(null);
    } else {
      setTemp(newValue.value.split(":"));
      //setSelected(newValue);
    }
  }
  function handleInputChange(inputValue, actionMeta) {
    //console.group("Input Changed");
    console.log(inputValue);
    //console.log(`action: ${actionMeta.action}`);
    //console.groupEnd();
    setTemp(inputValue.value.split(":"));
    //setSelected(inputValue);
  }

  function calculateNewDate(e) {
    e.preventDefault();
    if (temp.length !== 0) {
      console.log("in temp");
      console.log(newDate);
      console.log(eventStart);
      //setEventStart(eventStart.set("hour", temp[0]).set("minute", temp[1]));
      setStartDaySelected(
        startDaySelected.set("hour", temp[0]).set("minute", temp[1])
      );
      // setNewDate(newDate.set("hour", temp[0]).set("minute", temp[1]));
    } else {
      console.log("in min");
      console.log(typeof min);
      const tempmin = min.split(":");
      console.log(tempmin);
      setEventStart(
        eventStart.set("hour", tempmin[0]).set("minute", tempmin[1])
      );
    }
    //var d = new Date();
    //d.setHours(d.getHours() + 2)

    //alert(newDate)
    //alert(selected.value)
  }

  return (
    <div>
      <div>{`Created On: ${date.format()}`}</div>
      <div>{`New Date: ${newDate.format()}`}</div>
      <div>{`Event Start Date: ${startDaySelected.format()}`}</div>
      {console.log(date)}
      <CreatableSelect
        classNamePrefix="select2-selection"
        isClearable
        formatCreateLabel={(value) => `${value}`}
        defaultValue={{
          value: min,
          label: min,
        }}
        onChange={(e) => {
          handleChange(e);
        }}
        //onInputChange={()=>handleInputChange()}
        options={options.map(({ value, label }) => ({
          value: value,
          label: label,
        }))}
      />
      <button onClick={(e) => calculateNewDate(e)}>Calculate</button>
    </div>
  );
}

/*import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import Map from "./components/Map";

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCeE3WFHM-AVZcdpByS17Erh09hAwJ2mtI",
    libraries: ["places"],
  });
  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

export default App;*/
