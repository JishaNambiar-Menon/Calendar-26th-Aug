import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
import {getMonth} from "../util";
import chevron_front from "../frontend-ui-kit-main-src-icons/src/icons/chevron-forward-circle.svg";
import chevron_back from "../frontend-ui-kit-main-src-icons/src/icons/chevron-back-circle.svg";

export default function DatePicker() {
    const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
    const [currentMonth, setCurrentMonth] = useState(getMonth());

    useEffect(() => {
      setCurrentMonth(getMonth(currentMonthIdx));
      //setDatePicker(true)
    }, [currentMonthIdx]);

    const {
      monthIndex,
      setSmallCalendarMonth,
      daySelected,
      setDaySelected,
      setDatePicker,
      startDaySelected,
      setStartDaySelected,
      selectedEvent,
    } = useContext(GlobalContext);

    useEffect(() => {
      setCurrentMonthIdx(monthIndex);
    }, [monthIndex]);

    function handlePrevMonth(e) {
      e.preventDefault();
      setCurrentMonthIdx(currentMonthIdx - 1);
    }

    function handleNextMonth(e) {
      e.preventDefault();
      setCurrentMonthIdx(currentMonthIdx + 1);
      
    }

    function getDayClass(day) {
      const format = "DD-MM-YY";
      const nowDay = dayjs().format(format);
      const currDay = day.format(format);
      const slcDay = daySelected && daySelected.format(format);

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
      <div className="h-screen w-full fixed left-0 top-16 flex justify-center items-center">
        <form className="bg-white rounded-lg p-3 shadow-2xl w-1/5">
          <div className="flex">
            <p className="smallheader">
              {dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
                "MMMM YYYY"
              )}
            </p>

            <button onClick={handlePrevMonth}>
              <img
                alt="back"
                src={chevron_back}
                className="filter-gray w-5 h-5 -mt-4"
              />
            </button>

            <button onClick={handleNextMonth}>
              <img
                alt="front"
                src={chevron_front}
                className="filter-gray w-5 h-5 ml-3 -mt-4"
              />
            </button>
          </div>
          

          <div className="grid grid-cols-7 grid-rows-6 mt-2">
            {currentMonth[0].map((day, i) => (
              <span
                key={i}
                className="text-sm my-1 font-md font-sans text-center text-header-textgray"
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
                    onClick={() => {
                      //setSmallCalendarMonth(currentMonthIdx);
                      setStartDaySelected(day);
                      setDaySelected(day)
                      setDatePicker(false);
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
        </form>
      </div>
    );
}
