import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day1({ day, rowIdx, month }) {
  const [dayEvents, setDayEvents] = useState([]);
  const [endingDate, setEndingDate] = useState(dayjs());

  const {
    setDaySelected,
    setEndDaySelected,
    setStartDaySelected,
    startDaySelected,
    setShowEventModal,
    filteredEvents,
    savedEvents,
    setSelectedEvent,
    monthIndex,
    selectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = savedEvents.filter(
      (evt) =>
        dayjs(evt.startDateTime).format("DD-MM-YY") ===
          day.format("DD-MM-YY") ||
        dayjs(evt.endDateTime).format("DD-MM-YY") === day.format("DD-MM-YY") ||
        (day < dayjs(evt.endDateTime) && day > dayjs(evt.startDateTime))
    );
    setDayEvents(events);
  }, [savedEvents, day]);


  //to highlight today's date
  function getCurrentDayClass() {
    // console.log(monthIndex);

    if (day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")) {
      return "flex flex-grow text-sm mt-0.5 pb-2 ml-24 justify-center bg-header-orange text-white items-center rounded-full w-8 h-8 font-dmsans text-md font-bmed";
    } else if (
      day.format("MM") < dayjs().month(monthIndex).format("MM") ||
      day.format("MM") > dayjs().month(monthIndex).format("MM")
    ) {
      //console.log("previous month")
      return "flex justify-end pr-2 pt-2 text-gray-400 font-dmsans text-md font-bmed";
    } else {
      return "";
    }
  }

  /*function setStartEndDay() {
    if (selectedEvent) {
      setEndDaySelected(dayjs(new Date(selectedEvent.endDateTime)));
      setStartDaySelected(dayjs(new Date(selectedEvent.startDateTime)));
    } else {
      setEndDaySelected(dayjs());
      setStartDaySelected(dayjs());
    }
  }*/

  return (
    <div className="flex flex-col">
      <div className>
        <header className="flex flex-col items-center">
          {rowIdx === 0 && (
            <p className="font-sans text-header-medgray text-md -mt-6 ">
              {day.format("ddd")}
            </p>
          )}
        </header>
      </div>

      <div
        className="flex-1 h-[20em] cursor-pointer border border-gray-200 items-center"
        onClick={(e) => {
          console.log(selectedEvent.startDateTime);
         e.stopPropagation();
            
          
          
          selectedEvent
            ? setStartDaySelected(dayjs(new Date(selectedEvent.startDateTime)))
            : setStartDaySelected(day);
          selectedEvent
            ? setEndDaySelected(dayjs(new Date(selectedEvent.endDateTime)))
            : setEndDaySelected(day);
          
          setDaySelected(day);
          
          setShowEventModal(true);
        }}
      >
        <p
          className={`flex pt-2 font-dmsans text-md font-bmed justify-end ${getCurrentDayClass()}`}
        >
          {day.format("D")}
        </p>
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => {
              setSelectedEvent(evt);

              //setStartDaySelected(new Date(evt.startday));
            }}
            className={`flex flex-row p-1 mr-3 font-sans items-center text-gray-600 text-sm rounded mb-1 hover:bg-blue-100`}
          >
            <span className={`bg-blue-200 rounded-full w-2 h-2 mx-1`} key={idx}>
              {""}
            </span>
            <p className="truncate">{evt.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

//className={`text-sm p-5 my-1 items-center text-center ${getCurrentDayClass()}`}
/*<div className>
        <header className="flex flex-col items-center">
          {rowIdx === 0 && (
            <p className="font-dmsans text-header-medgray text-md ">
              {day.format("ddd")}
            </p>
          )}
        </header>
      </div>*/
