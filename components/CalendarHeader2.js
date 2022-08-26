import React, { useEffect, useState } from "react";
import mail from "../frontend-ui-kit-main-src-icons/src/icons/mail-unread.svg";
import filter from "../frontend-ui-kit-main-src-icons/src/icons/filter-custom.svg";
import set from "../frontend-ui-kit-main-src-icons/src/icons/settings.svg";
import { FaCaretDown } from "react-icons/fa";
import "../App.css";

export default function Header1({ selected, setSelected }) {
  const [isActive, setIsActive] = useState(false);
  const [selType, setSelType] = useState("Month");
  const options = ["Day", "Week", "Month", "Year", "Custom"];

  function buttonClick() {
    alert("Pending Invitations");
  }

  return (
    <div className="flex">
      <div className="flex-none order-none grow pl-16 pt-4 font-sans w-124 h-8 text-lg text-header-gray leading-32 font-big normal">
        Calendar
      </div>

      <div className="flex flex-start fixed order-none align-items-center font-inter inline-block relative w-40 h-10 mt-3 pr-2">
        <div
          className="dropdown w-32 h-10"
        >
          <div
            className="dropdown-btn font-inter w-33 h-10"
            onClick={(e) => {
              setIsActive(!isActive);
            }}
          >
            {selected}
            <FaCaretDown color="gray" fontSize="1.2em" />
          </div>
          {isActive && (
            <div className="dropdown-content font-mono">
              {options.map((option) => (
                <div
                  onClick={(e) => {
                    setSelected(option);
                    setIsActive(false);
                    //setSelType(option);
                  }}
                  className="dropdown-item"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex rounded items-center font-dmsans text-md bg-header-white box-border border-2 border-header-bordergray shadow-3xl w-49 h-10 mt-4 mr-3">
        <img alt="mail" src={mail} className="w-4 h-5 mr-3 ml-3" />
        <button
          onClick={(e) => {
            buttonClick();
          }}
          className="text-md leading-32 normal mr-3 flex-wrap break-normal"
        >
          Pending Invitations
        </button>
        <div className="w-6 h-6 pt-0.5 mr-1 rounded-full bg-orange-400 text-center text-md text-header-white leading-33 font-med normal">
          2
        </div>
      </div>
      <div className="flex rounded items-center font-dmsans bg-header-white box-border border-2 border-header-bordergray shadow-3xl w-70 h-10 mr-3 mt-4 mb-16">
        <img alt="filter" src={filter} className="w-6 h-4 pl-2" />
        <button className="pl-2.5 pr-2.5 pt-3 pb-3 text-md font-normal leading-32 normal">
          Filter events
        </button>
      </div>

      <div className="flex rounded items-center font-dmsans bg-header-white box-border border-2 border-header-bordergray shadow-3xl w-70 h-10 mt-4 mr-10">
        <img alt="set" src={set} className="w-6 h-4 pl-2" />
        <button className="pl-2.5 pr-2.5 pt-3 pb-3 text-md font-normal leading-32 normal">
          Settings
        </button>
      </div>
    </div>
  );
}
