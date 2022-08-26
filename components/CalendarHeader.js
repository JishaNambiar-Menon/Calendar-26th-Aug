import dayjs from 'dayjs';
import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import chevron_front from "../frontend-ui-kit-main-src-icons/src/icons/chevron-forward-circle.svg";
import chevron_back from "../frontend-ui-kit-main-src-icons/src/icons/chevron-back-circle.svg";


export default function CalendarHeader() {
  const {monthIndex, setMonthIndex} = useContext(GlobalContext);

  function handlePrevMonth(){
    setMonthIndex(monthIndex - 1)
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handleReset(){
    setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random(): dayjs().month() )
  }

  return (
    <div className="flex flex-row justify-end">
      <header className="ml-2 pt-2 w-[24em] h-[5em] inline-block">
        <h2 className="text-xl text-header-medgray font-bold font-sans">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
      </header>

      <div className="flex flex-row pt-2 pl-2 pb-4 ml-96">
        <button onClick={handlePrevMonth}>
          <img
            alt="back"
            src={chevron_back}
            className="filter-gray -mt-5 w-12 h-8"
          />
        </button>
        <button
          onClick={handleReset}
          className="border rounded w-[6em] h-8 pl-2 pr-2 pt-1 ml-4 mr-4 font-sans font-bmed text-md"
        >
          Today
        </button>
        <button onClick={handleNextMonth}>
          <img
            alt="front"
            src={chevron_front}
            className="filter-gray w-8 h-8 mr-3 -mt-5 "
          />
        </button>
      </div>
    </div>
  );
}
