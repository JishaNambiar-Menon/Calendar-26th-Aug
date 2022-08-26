import React, { useContext } from 'react'
import { borderRadius } from 'tailwindcss/defaultTheme';
import plusImg from "../assets/plus.svg";
import GlobalContext from '../context/GlobalContext';
import "../App.css";
import add from "../frontend-ui-kit-main-src-icons/src/icons/add.svg";

export default function CreateEventButton() {
  const {setShowEventModal} = useContext(GlobalContext)
  return (
    <button className="createevent" onClick={() => setShowEventModal(true)}>
      <img src={add} alt="create_event" className="w-5 h-5" />
      <p className="pr-2 font-sans font-bold text-header-gray text-sm">
        Create event
      </p>
    </button>
  );
}

