import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { getMonth } from "../util";
import GlobalContext from "../context/GlobalContext";
import CreateEventButton from "./CreateEventButton";
import chevron_front from "../frontend-ui-kit-main-src-icons/src/icons/chevron-forward-circle.svg";
import chevron_back from "../frontend-ui-kit-main-src-icons/src/icons/chevron-back-circle.svg";

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const {
    monthIndex,
    setSmallCalendarMonth,
    daySelected,
    setDaySelected,
    setEndDaySelected,
    setStartDaySelected,
    selectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }

  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }

  function getDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    //console.log("current", currDay);
    if (nowDay === currDay) {
      return "bg-header-orange w-8 h-8 rounded-full text-white";
    } else if (currDay === slcDay) {
      return "bg-header-lightorange w-8 h-8 rounded-full text-black-600";
    }

    if (
      day.format("MM") < dayjs().month(currentMonthIdx).format("MM") ||
      day.format("MM") > dayjs().month(currentMonthIdx).format("MM")
    ) {
      //console.log("previous month")
      return "text-header-lightgray";
    } else {
      return "text-header-medgray";
    }
  }

  return (
    <div className="mt-1 z-10">
      <div className="flex">
        <header className="smallheader">
          <p className="smallheader">
            {dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
              "MMMM YYYY"
            )}
          </p>
        </header>

        <div>
          <button onClick={handlePrevMonth}>
            <img
              alt="back"
              src={chevron_back}
              className="filter-gray w-5 h-5 mr-3 ml-3"
            />
          </button>

          <button onClick={handleNextMonth}>
            <img
              alt="front"
              src={chevron_front}
              className="filter-gray w-5 h-5 mr-3 ml-3"
            />
          </button>
        </div>
      </div>

      <CreateEventButton />

      <hr
        style={{
          width: "256px",
          height: "0px",
          border: "1px solid #E4E6F2",
          order: 2,
          alignSelf: "stretch",
          flexGrow: 0,
          marginTop: "16px",
        }}
      />

      <div className="grid grid-cols-7 grid-rows-6 mt-5">
        {currentMonth[0].map((day, i) => (
          <span
            key={i}
            className="text-sm my-1 font-md font-dmsans text-center text-header-textgray"
          >
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                className={`py-1 ${getDayClass(day)}`}
                onClick={(e) => {
                  e.preventDefault();
                  setSmallCalendarMonth(currentMonthIdx);
                  setEndDaySelected(day);
                  setStartDaySelected(day);
                  setDaySelected(day);
                 
                }}
              >
                <span className={`text-sm font-dmsans ${getDayClass(day)}`}>
                  {day.format("D")}
                </span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
