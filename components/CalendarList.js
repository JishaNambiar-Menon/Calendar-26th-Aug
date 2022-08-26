import React from "react";
import person from "../frontend-ui-kit-main-src-icons/src/icons/person-circle.svg";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";

export default function CalendarList() {
  return (
    <div className="flex flex-col">
      <p className="font-sans font-bold text-header-medgray mt-1">
        My calendars
      </p>
      <div className="bg-white border border-header-lightgray rounded truncate">
        <label className="flex pb-2">
          <input
            type="checkbox"
            className={`form -checkbox mt-3 ml-3 h-5 w-5 text-black rounded focus: ring-1 cursor-pointer`}
          />
          <img
            alt="person"
            src={person}
            className="filter-gray w-[2.5em] h-[2.5em] mt-1 mr-1 ml-3"
          />
          <p className="ml-1 mt-1 font-sans text-sm font-bold whitespace-normal">
            Alfredo Carder (individual)
          </p>
          <FaCaretUp color="gray" fontSize="1.4em" className="mr-1" />
        </label>
        <div className="border border-header-lightgray bg-gray-100">
          <label className="flex">
            <input
              type="checkbox"
              className={`form -checkbox mt-3 ml-3 h-5 w-5 text-black rounded focus: ring-1 cursor-pointer`}
            />
            <p className="ml-2 mt-3 pb-2 font-sans text-sm font-bold">
              Alfredo Carder (You)
            </p>
          </label>
          <p className="font-sans font-bold text-sm text-header-medgray mt-2 pl-2 pb-2">
            Property
          </p>
          <label className="flex m-2">
            <input
              type="checkbox"
              className={`form -checkbox h-5 w-5 text-black rounded focus: ring-1 cursor-pointer`}
            />
            <p className="ml-2 font-sans text-sm">Property 01</p>
          </label>
          <label className="flex m-2">
            <input
              type="checkbox"
              className={`form -checkbox h-5 w-5 text-black rounded focus: ring-1 cursor-pointer`}
            />
            <p className="ml-2 font-sans text-sm">Property 02</p>
          </label>
        </div>
      </div>

      <div className="bg-white border border-header-lightgray rounded">
        <label className="flex pb-2">
          <input
            type="checkbox"
            className={`form -checkbox mt-3 ml-3 h-5 w-5 text-black rounded focus: ring-1 cursor-pointer`}
          />
          <img
            alt="person"
            src={person}
            className="filter-gray w-[2.5em] h-[2.5em] mt-1 mr-1 ml-3"
          />
          <p className="ml-1 mt-1 font-sans text-sm font-bold whitespace-normal">
            Alfredo Carder (Business)
          </p>
          <FaCaretUp color="gray" fontSize="1.4em" className="mr-1" />
        </label>
        <div className="border border-header-lightgray bg-gray-100 whitespace-normal truncate">
          <p className="font-sans font-bold text-sm text-header-medgray mt-2 pt-2 pl-2 pb-2">
            Team members
          </p>
          <label className="flex m-2">
            <input
              type="checkbox"
              className={`form -checkbox h-5 w-5 text-black rounded focus: ring-1 cursor-pointer`}
            />
            <img
              alt="person"
              src={person}
              className="filter-gray w-[1.5em] h-[1.5em] mr-1 ml-3"
            />
            <p className="ml-2 font-sans text-sm">Alfredo Carder(You)</p>
          </label>
          <label className="flex m-2">
            <input
              type="checkbox"
              className={`form -checkbox h-5 w-5 text-black rounded focus: ring-1 cursor-pointer`}
            />
            <img
              alt="person"
              src={person}
              className="filter-gray w-[1.5em] h-[1.5em] mr-1 ml-3"
            />
            <p className="ml-2 font-sans text-sm">Elon Musk</p>
          </label>
          <label className="flex m-2">
            <input
              type="checkbox"
              className={`form -checkbox h-5 w-5 text-black rounded focus: ring-1 cursor-pointer`}
            />
            <img
              alt="person"
              src={person}
              className="filter-gray w-[1.5em] h-[1.5em] mr-1 ml-3"
            />
            <p className="ml-2 font-sans text-sm">Jeff Bezos</p>
          </label>
          <label className="flex m-2">
            <input
              type="checkbox"
              className={`form -checkbox h-5 w-5 text-black rounded focus: ring-1 cursor-pointer`}
            />
            <img
              alt="person"
              src={person}
              className="filter-gray w-[1.5em] h-[1.5em] mr-1 ml-3"
            />
            <p className="ml-2 font-sans text-sm truncate">
              i.newton@gravity.com
            </p>
          </label>

          <p className="font-sans font-bold text-sm text-header-medgray mt-2 pl-2 pb-2 pt-2">
            Services
          </p>
          <label className="flex m-2">
            <input
              type="checkbox"
              className={`form -checkbox h-5 w-5 text-black rounded focus: ring-1 cursor-pointer`}
            />
            <p className="ml-2 font-sans text-sm truncate">Service 01</p>
          </label>
          <label className="flex m-2">
            <input
              type="checkbox"
              className={`form -checkbox h-5 w-5 text-black rounded focus: ring-1 cursor-pointer`}
            />
            <p className="ml-2 font-sans text-sm">Service 02</p>
          </label>

          <p className="font-sans font-bold text-sm text-header-medgray mt-2 pl-2 pb-2  pt-2">
            Property
          </p>
          <label className="flex m-2">
            <input
              type="checkbox"
              className={`form -checkbox h-5 w-5 text-black rounded focus: ring-1 cursor-pointer`}
            />
            <p className="ml-2 font-sans text-sm">Property 01</p>
          </label>
          <label className="flex m-2">
            <input
              type="checkbox"
              className={`form -checkbox h-5 w-5 text-black rounded focus: ring-1 cursor-pointer`}
            />
            <p className="ml-2 font-sans text-sm">Property 02</p>
          </label>
        </div>
      </div>
    </div>
  );
}
