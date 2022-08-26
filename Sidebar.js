import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
import SideScroll from "./SideScroll";
import SearchButton from "./SearchButton";

export default function Sidebar() {
  return (
    <aside className="border overflow-y-auto w-120 p-5">
      <SmallCalendar />
      <SearchButton />
      <hr
        style={{
          width: "221px",
          marginBottom: "2px",
          
          /* accent/yellow */

          border: "2px solid #F7CA16",
          transform: "rotate(180deg)",
        }}
      />
      
      <SideScroll />
    </aside>
  );
}

//<Labels />
