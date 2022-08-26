import React, { useContext, useEffect, useState } from "react";
import DatePicker from "./DatePicker";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    setDaySelected,
    dispatchCalEvent,
    selectedEvent,
    setSelectedEvent,
    showDatePicker,
    setDatePicker,
    setDatePicker1,
    startDaySelected,
    endDaySelected,
  } = useContext(GlobalContext);

  const [activateSubmit, setActivateSubmit] = useState(false);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  /*const [labelsClasses1, setLabelClasses] = useState([
      "indigo",
      "blue",
      "yellow",
      "red",
      "gray",
    ]);*/
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  useEffect(() => {
    if (startDaySelected <= endDaySelected) {
      setActivateSubmit(true);
    } else {
      setActivateSubmit(false);
      
    }
  });
  /*
    useEffect(()=> {
      setLabelClasses(labelsClasses1)
    }, [labelsClasses1])*/

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      //day: startDaySelected.valueOf(),
      startday: startDaySelected.valueOf(),
      endday: endDaySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }

  function getDay(x) {
    let dateObj = new Date(x);
    let month = dateObj.getMonth();
    let year = dateObj.getFullYear();
    let date = dateObj.getDate();
    let day = dayjs(new Date(year, month, date)).format("dddd, MMMM DD");
    //selectedEvent.startday = startDaySelected.valueOf();
    //selectedEvent.endday = endDaySelected.valueOf();
    return day;
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-gray-200 rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>

          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}

            <button
              onClick={() => {
                setShowEventModal(false);
              }}
            >
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add Title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className="material-icons-outlined text-gray-400"
              onClick={(e) => {
                e.preventDefault();
                setDatePicker(true);
              }}
            >
              schedule
            </button>
            {selectedEvent
              ? console.log(selectedEvent.startday, selectedEvent.endday)
              : console.log("no data")}
            <p>{startDaySelected.format("dddd, MMMM DD")}</p>

            <button
              className="material-icons-outlined text-gray-400"
              onClick={(e) => {
                e.preventDefault();
                setDatePicker1(true);
              }}
            >
              schedule
            </button>

            <p>{endDaySelected.format("dddd, MMMM DD")}</p>

            {console.log(endDaySelected - startDaySelected)}

            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            disabled={!activateSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
            onClick={handleSubmit}
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
