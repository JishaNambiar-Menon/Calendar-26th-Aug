import React from "react";
import CalendarList from "./CalendarList"

export default function SideScroll() {
  return (
    <div className="bg-white w-64 m-1 pt-1 pr-20 ">
      <div className="w-64 bg-white h-60 overflow-hidden overflow-y-scroll scrollbar-hide">
        <CalendarList />
      </div>
    </div>
  );
}
