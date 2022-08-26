import React, { useEffect, useState, useContext } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

import CreatableSelect from "react-select/creatable";
import "../App.css";
import { height } from "@mui/system";

export default function Timepicker() {
  const {
    startDaySelected,
    endDaySelected,
    setStartDaySelected,
    setEndDaySelected,
    tempStart,
    setTempStart
  } = useContext(GlobalContext);

  const [eventStart, setEventStart] = useState(dayjs(startDaySelected));
  const [date, setDate] = useState(dayjs());
  const [newDate, setNewDate] = useState(dayjs("2022-07-21T18:30:00.000Z"));
  //const [temp, setTemp] = useState([]);

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

  //className="flex m-1 p-1 w-16 h-8 bg-gray-100 border-0 rounded text-gray-600 text-md font-med font-sans border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#F3F4F6",
      borderColor: "#F3F4F6",
      color: "#F3F4F6",
      height: "20px",
      padding: "0px 0px 0px 0px",
      fontSize: "14px",
      minHeight: "30px",
      //height: "30px",
      width: "64px",
      boxShadow: state.isFocused ? null : null,
      
    }),
    menu: provided => ({ ...provided, zIndex: 9999 }),
    option: (styles, { isDisabled }) => {
    return {
      ...styles,
      color: "#212121",
      fontSize: "12px",
      padding: "8px 2px 8px 8px",
    };
  },

    singleValue: (provided) => ({
      ...provided,
      height: "100%",
      color: "#616161",
      fontStyle: "bold",
      paddingTop: "3px",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      padding: "0px 0px 0px 0px",
      fontSize: "14px",
    }),

    input: (provided, state) => ({
      ...provided,
      height: "20px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "20px",
    }),
  };

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
      setTempStart(newValue.value.split(":"));
      //setSelected(newValue);
    }
  }

  const defaultValue = `${String(new Date(startDaySelected).getHours()).padStart(
            2,
            "0"
          )}:${String(new Date(startDaySelected).getMinutes()).padStart(
            2,
            "0"
          )}`
  /*function calculateNewDate(e) {
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
    } 
    /*else {
      console.log("in min");
      console.log(typeof min);
      const tempmin = min.split(":");
      console.log(tempmin);
      setStartDaySelected(
        startDaySelected.set("hour", temp[0]).set("minute", temp[1])
      );
    }
  }*/

  return (
    <div className="pt-1">
      <CreatableSelect
        //className="flex m-1 p-1 w-16 h-8 bg-gray-100 border-0 rounded text-gray-600 text-md font-med font-sans border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
        styles={customStyles}
        components={{
          LoadingIndicator: () => null,
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        classNamePrefix="select2-selection"
        cssClass="e-caret-hide"
        isClearable={false}
        formatCreateLabel={(value) => `${value}`}
        defaultValue={{
          value: {defaultValue},
          label: `${String(new Date(startDaySelected).getHours()).padStart(
            2,
            "0"
          )}:${String(new Date(startDaySelected).getMinutes()).padStart(
            2,
            "0"
          )}`,
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
      
    </div>
  );
}
