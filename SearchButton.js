import React, { useContext } from "react";
import search from "../frontend-ui-kit-main-src-icons/src/icons/search.svg";
import { BiSearch } from "react-icons/bi";
import GlobalContext from "../context/GlobalContext";

export default function SearchButton() {

  const {daySelected} = useContext(GlobalContext);

  //console.log(daySelected)
  
  return (
    <div className="flex rounded items-center">
      <form>
        <input
          className="w-full z-0 pb-1.5 font-sans font-med text-md mr-10 mt-8 text-primary opacity-25 outline-none rounded-md cursor-pointer"
          type="text"
          name="name"
          placeholder="View calendars of"
          
        />
      </form>
      <button className="w-11 h-11 mt-6 -mb-3 bg-header-medgray rounded-md focus:shadow-outline hover:bg-gray-400">
        <BiSearch color="white" fontSize="1.9em" className="ml-1.5" />
      </button>
    </div>
  );
}

//<img src={search} className="pl-3"></img>;
