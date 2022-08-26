import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Switch from "react-switch";
import Timepicker from "./Timepicker";
import Timepicker1 from "./Timepicker1";
import Modal from "react-modal";
import Location from "./Location";



import calendar from "../frontend-ui-kit-main-src-icons/src/icons/calendar.svg";
import bell from "../frontend-ui-kit-main-src-icons/src/icons/notifications.svg";
import mail from "../frontend-ui-kit-main-src-icons/src/icons/mail.svg";
import map_pin from "../frontend-ui-kit-main-src-icons/src/icons/map-pin.svg";
import add from "../frontend-ui-kit-main-src-icons/src/icons/add.svg";
import search from "../frontend-ui-kit-main-src-icons/src/icons/search.svg";
import down from "../frontend-ui-kit-main-src-icons/src/icons/caret-down-custom.svg";
import people from "../frontend-ui-kit-main-src-icons/src/icons/people.svg";
import person from "../frontend-ui-kit-main-src-icons/src/icons/person-circle.svg";
import checkhost from "../frontend-ui-kit-main-src-icons/src/icons/checkmark-circle.svg";
import check from "../frontend-ui-kit-main-src-icons/src/icons/checkmark-circle-green.svg";
import uncheck from "../frontend-ui-kit-main-src-icons/src/icons/close-circle.svg";
import save from "../frontend-ui-kit-main-src-icons/src/icons/save.svg";
import help from "../frontend-ui-kit-main-src-icons/src/icons/help-circle.svg";

import { FaCaretDown } from "react-icons/fa";

import "../App.css";
import TextEditor from "./TextEditor";

import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
import { duration } from "@mui/material";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EditEvent() {

  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState(0);
  const [enable, setEnable] = useState(true);
  const [privateChecked, setPrivateChecked] = useState(false);
  const [busyChecked, setBusyChecked] = useState(false);

  const [events, setEvents] = useState([]);

  const [isActive, setIsActive] = useState(false);
  const options = ["Does not repeat", "Daily", "Every workday", "Custom"];
  const [selected, setSelected] = useState("Does not repeat");

  const optionsTool = ["In-person meeting", "Chat", "Phone call", "Voice call"];
  const [selectedTool, setSelectedTool] = useState("In-person meeting");
  const [isActiveTool, setIsActiveTool] = useState(false);

  const notificationsTool1 = [
    { img: bell, value: "On-screen notification" },
    { img: mail, value: "Email notification" },
  ];

  const [isActiveNotification1, setIsActiveNotification1] = useState(false);

  const notificationsTool2 = [
    { img: bell, value: "On-screen notification" },
    { img: mail, value: "Email notification" },
  ];
  /*const [selectedNotification2, setSelectedNotification2] = useState({
    img: "",
    value: "",
  });*/
  const [isActiveNotification2, setIsActiveNotification2] = useState(false);

  const modules = {
    toolbar: [
      [{ size: [] }],
      ["bold", "italic", "underline"],
      ["link", "image"],
    ],
  };
  const formats = ["size", "bold", "italic", "underline", "link", "image"];

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
    setStartDaySelected,
    setEndDaySelected,
    savedEvents,
    setSavedEvents,
    tempStart,
    showMap,
    setShowMap,
    officeVal,
    setOfficeVal,
    office,
    setOffice
  } = useContext(GlobalContext);

  const [selectedNotification1, setSelectedNotification1] = useState(
    selectedEvent
      ? selectedEvent.emailNotification[0].emailNotification
        ? { img: mail, value: "Email notification" }
        : { img: "", value: "" }
      : { img: "mail", value: "Email notification" }
  );

  const [selectedNotification2, setSelectedNotification2] = useState(
    selectedEvent
      ? selectedEvent.onScreenNotification[0].onScreenNotification
        ? { img: bell, value: "On-screen notification" }
        : { img: "", value: "" }
      : { img: "bell", value: "On-screen notification" }
  );

  const durationTool = ["Minutes", "Hours", "Days", "Weeks"];
  const [time, setTime] = useState(selectedEvent ? selectedEvent.emailNotification[0].time : 15);
  const [time2, setTime2] = useState(
    selectedEvent ? selectedEvent.onScreenNotification[0].time : 15
  );

  const [selectedDuration, setSelectedDuration] = useState(selectedEvent ? selectedEvent.emailNotification[0].duration : "Minutes");
  const [isActiveDuration, setIsActiveDuration] = useState(false);
  const [selectedDuration2, setSelectedDuration2] = useState(selectedEvent ? selectedEvent.onScreenNotification[0].duration : "Minutes");
  const [isActiveDuration2, setIsActiveDuration2] = useState(false);

  const [showNotification1, setShowNotification1] = useState(
    selectedEvent
      ? selectedEvent.emailNotification[0].emailNotification
        ? true
        : false
      : false
  );

  const [showNotification2, setShowNotification2] = useState(
    selectedEvent
      ? selectedEvent.onScreenNotification[0].onScreenNotification
        ? true
        : false
      : false
  );

  console.log(Object.keys(selectedEvent)[7]);
  const [activateSubmit, setActivateSubmit] = useState(false);
  const [nextDay, setNextDay] = useState(dayjs());

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );

  console.log(title);
  const [attendees, setAttendees] = useState(
    selectedEvent ? selectedEvent.attendees : ""
  );
  const [notifications, setNotifications] = useState(
    selectedEvent ? selectedEvent.notifications : []
  );

  const [createdBy, setCreatedBy] = useState(
    selectedEvent ? selectedEvent.createdBy : ""
  );

  
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  const [min, setMin] = useState(
    selectedEvent ? dayjs(selectedEvent.startDateTime) : ""
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

  const handleCloseNotification = async (e) => {
    e.preventDefault();

    const id = selectedEvent
      ? selectedEvent.eventId
      : savedEvents[savedEvents.length - 1].eventId + 1;

    const editNotification = {
      emailNotification: [
        { emailNotification: false, time: null, duration: "" },
      ],
    };

    setSelectedNotification1({ img: "", value: "" });

    if (selectedEvent) {
      try {
        const response = await axios.patch(
          `http://localhost:3005/event/${id}`,
          editNotification
        );
        setSavedEvents(
          savedEvents.map((event) =>
            event.eventId === id ? { ...response.data } : event
          )
        );

        //window.location.reload();
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }

    // setShowEventModal(false);
  };

  const handleCloseNotification2 = async (e) => {
    e.preventDefault();

    const id = selectedEvent
      ? selectedEvent.eventId
      : savedEvents[savedEvents.length - 1].eventId + 1;

    const editNotification = {
      onScreenNotification: [
        { onScreenNotification: false, time: null, duration: "" },
      ],
    };

    setSelectedNotification2({ img: "", value: "" });

    if (selectedEvent) {
      try {
        const response = await axios.patch(
          `http://localhost:3005/event/${id}`,
          editNotification
        );
        setSavedEvents(
          savedEvents.map((event) =>
            event.eventId === id ? { ...response.data } : event
          )
        );

        //window.location.reload();
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }

    // setShowEventModal(false);
  };

  console.log("office coord", office)
  const [officeAddress, setOfficeAddress] = useState(
    selectedEvent.location[0].address
      ? selectedEvent.location[0].address
      : "xxxx xxxx"
  );
  const handleSubmit = async () => {
    //e.preventDefault();

    const id = selectedEvent
      ? selectedEvent.eventId
      : savedEvents[savedEvents.length - 1].eventId + 1;

    
  

    const newEvent = {
      eventId: id,
      title,
      description,
      startDateTime: startDaySelected,
      endDateTime: endDaySelected,
      attendees,
      createdBy,
      location: [{
        coordinates: [office ? office : {lat: 0, lng: 0}],
        address: officeVal
      }],
      emailNotification: [
        selectedNotification1.value === "Email notification" ||
        selectedNotification2.value === "Email notification"
          ? {
              emailNotification: true,
              time:
                selectedNotification1.value === "Email notification"
                  ? parseInt(time)
                  : parseInt(time2),
              duration:
                selectedNotification1.value === "Email notification"
                  ? selectedDuration
                  : selectedDuration2,
            }
          : { emailNotification: false, time: null, duration: "" },
      ],
      onScreenNotification: [
        selectedNotification1.value === "On-screen notification" ||
        selectedNotification2.value === "On-screen notification"
          ? {
              onScreenNotification: true,
              time:
                selectedNotification1.value === "On-screen notification"
                  ? parseInt(time)
                  : parseInt(time2),
              duration:
                selectedNotification1.value === "On-screen notification"
                  ? selectedDuration
                  : selectedDuration2,
            }
          : {
              onScreenNotification: false,
              time: null,
              duration: "",
            },
      ],
    };

    if (selectedEvent) {
      try {
        const response = await axios.put(
          `http://localhost:3005/event/${id}`,
          newEvent
        );
        setSavedEvents(
          savedEvents.map((event) =>
            event.eventId === id ? { ...response.data } : event
          )
        );

        //window.location.reload();
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3005/event",
          newEvent
        );
        const allEvents = [...events, response.data];
        setSavedEvents(allEvents);
        //window.location.reload();
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }

    setShowEventModal(false);
  };

  function disableButton(e) {
    e.preventDefault();
    //console.log(count);
    if (count < 3) {
      if (!showNotification1) {
        setShowNotification1(true);
      } else if (!showNotification2 && showNotification1) {
        setShowNotification2(true);
      }
      setCount(count + 1);
      setEnable(true);
    } else {
      setEnable(false);
    }
  }

  

  function getAvailability(contact) {
    console.log(contact);
    if (contact.status === "none") {
      return (
        <div className="flex rounded ml-auto bg-orange-100 items-center mr-4">
          <img alt="help" src={help} className="w-4 h-5 ml-1 mr-2" />
          <p className="font-sans text-sm ml-auto mr-7 px-1 text-orange-400 z-0">
            Pending
          </p>
        </div>
      );
    } else if (contact.status === "accept") {
      return (
        <div className="flex rounded ml-auto bg-green-100 items-center mr-4">
          <img alt="check" src={check} className="w-4 h-5 ml-1 mr-2" />
          <p className="font-sans text-sm ml-auto mr-6 px-1 text-green-700">
            Available
          </p>
        </div>
      );
    } else if (contact.status === "reject") {
      return (
        <div className="flex rounded ml-auto bg-red-100 items-center mr-4">
          <img alt="uncheck" src={uncheck} className="w-4 h-5 ml-1 mr-2" />
          <p className="font-sans text-sm ml-auto mr-12 px-1 text-red-400">
            Busy
          </p>
        </div>
      );
    } else {
      return (
        <div className="flex rounded ml-auto bg-gray-200 items-center mr-10">
          <img alt="checkhost" src={checkhost} className="w-4 h-5 ml-1 mr-2" />
          <p className="font-sans text-sm ml-auto mr-6 px-1.5 text-gray-700">
            Host
          </p>
        </div>
      );
    }
  }

  function getNextDay(x) {
    let dateObj = new Date(x);
    let month = dateObj.getMonth();
    let year = dateObj.getFullYear();
    let date = dateObj.getDate() + 1;
    let tomorrow = dayjs(new Date(year, month, date)).format("MMMM DD, dddd");

    return tomorrow;
  };

  
  

  return (
    <div className="h-screen w-full h-full fixed flex items-center z-10 overflow-y-auto scrollbar-hide  ">
      <form className="bg-gray-200 relative rounded w-2/5 my-auto ">
        <header className="bg-header-white px-4 flex fixed rounded w-2/5 my-auto justify-between items-center border-2 border-gray-300 z-30">
          <div className="text-header-gray font-sans font-bold">Edit event</div>

          <div>
            {/*{selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}*/}
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
          <div>
            <p className="text-left font-sans font-bold text-md pt-8 pl-1 sticky top-0">
              Title*
            </p>
          </div>
          <div className="flex flex-col gap-y-1">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add Title"
              value={title}
              required
              className="m-1 p-1 w-full bg-gray-100 border-0 rounded text-gray-600 text-md font-med font-sans border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-left font-sans font-bold text-md pl-1 mt-6">
              Date & time*
            </p>

            {console.log(startDaySelected)}
            <div className="flex">
              <button
                required
                className="flex m-1 p-1 w-48 h-8 bg-gray-100 border-0 rounded text-gray-600 text-md font-med font-sans border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onClick={(e) => {
                  e.preventDefault();
                  setDatePicker(true);
                }}
              >
                <img
                  alt="calendar"
                  src={calendar}
                  className="w-4 h-5 ml-1 mr-2"
                />

                <p className="font-sans text-md font-bold truncate">
                  {startDaySelected.format("MMMM DD, YYYY")}
                </p>
              </button>

              <Timepicker />

              <span className="mt-2 mx-1">{"-"}</span>
              <button
                required
                className="flex m-1 p-1 w-48 h-8 bg-gray-100 border-0 rounded text-gray-600 text-md font-med font-sans border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onClick={(e) => {
                  e.preventDefault();
                  setDatePicker1(true);
                }}
              >
                <img
                  alt="calendar"
                  src={calendar}
                  className="w-4 h-5 ml-1 mr-2"
                />

                <p className="font-sans text-md font-bold truncate">
                  {endDaySelected.format("MMMM DD, YYYY")}
                </p>
              </button>
              <Timepicker1 />
            </div>

            <div className="flex mt-1 ml-1">
              <input
                type="checkbox"
                className={`form -checkbox h-5 w-5 mr-2 bg-gray-100 text-black rounded focus: ring-1 cursor-pointer`}
              />
              <p className="font-sans font-medium text-md">All day</p>
            </div>
            <p className="text-left font-sans font-bold text-md pl-1 mt-4">
              Repeat*
            </p>
            <div className="flex align-items-center font-sans w-full h-10 z-40">
              <div className="dropdown w-full bg-red-500">
                <div
                  className="dropdown-btn font-sans w-full h-10"
                  onClick={(e) => {
                    setIsActive(!isActive);
                  }}
                >
                  {selected}
                  <FaCaretDown color="gray" fontSize="1.2em" />
                </div>
                {isActive && (
                  <div className="dropdown-content font-big font-sans z-10">
                    {options.map((option, idx) => (
                      <div
                        key={idx}
                        onClick={(e) => {
                          setSelected(option);
                          setIsActive(false);
                          //setSelType(option);
                        }}
                        className="dropdown-item font-big text-gray-600"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <p className="text-left font-sans font-bold text-md pl-1 mt-4">
              Connection tool
            </p>
            <div className="flex align-items-center font-sans w-full h-10">
              <div className="dropdown w-full bg-red-500">
                <div
                  className="dropdown-btn font-sans w-full h-10"
                  onClick={(e) => {
                    setIsActiveTool(!isActiveTool);
                  }}
                >
                  {selectedTool}
                  <FaCaretDown color="gray" fontSize="1.2em" />
                </div>
                {isActiveTool && (
                  <div className="dropdown-content font-big font-sans z-30">
                    {optionsTool.map((option, idx) => (
                      <div
                        key={idx}
                        onClick={(e) => {
                          setSelectedTool(option);
                          setIsActiveTool(false);
                          //setSelType(option);
                        }}
                        className="dropdown-item font-big text-gray-600"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <button
                className="flex mr-2 w-3/4 h-10 bg-white border-0 rounded text-gray-600 text-md font-med font-sans border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowMap(true);
                  //setShowModal(true);
                }}
              >
                <img
                  alt="map_pin"
                  src={map_pin}
                  className="w-6 h-6 fill-black m-1"
                />
                <p className="font-sans pt-1 text-gray-500 text-xs mt-1.5 truncate">
                  {officeAddress}
                </p>
              </button>
              <button className="w-1/2 h-10 bg-white border-0 rounded text-gray-600 text-md font-bold font-sans border-b-2 border-gray-200">
                Generate Link
              </button>
            </div>

            {showMap && (
              <>
                <Location />
                <button
                  className="close-button"
                  onClick={() => {
                    setShowMap(false);
                    setOfficeAddress(officeVal)
                  }}
                >
                  close
                </button>
              </>
            )}

            <div>
              <p className="text-left font-sans font-bold text-md pl-1 mt-4">
                Description
              </p>
              {/*console.log(selectedTool)*/}
              <ReactQuill
                className="z-10"
                theme="snow"
                value={description}
                modules={modules}
                formats={formats}
                placeholder={"Type something..."}
                onChange={(val) => setDescription(val)}
                onKeyDown={() => {
                  if (description.length >= 22) {
                    setDescription(description.slice(0, 22));
                  }
                }}
              />
              <div className="flex flex-row-reverse ">
                <p className="font-sans text-sm -mt-8 mr-4 z-0 text-gray-400 z-0">
                  {description.length - 7 + "/8094"}
                </p>
              </div>
            </div>

            <p className="font-sans font-bold text-md pl-1 mt-4">
              Notification
            </p>

            {showNotification1 && (
              <div className="flex flex-row w-full font-sans z-10">
                <div className="dropdown w-1/2 h-8 flex-none ">
                  <div
                    className="dropdown-btn flex-none "
                    onClick={(e) => {
                      e.preventDefault();
                      setIsActiveNotification1(!isActiveNotification1);
                    }}
                  >
                    <img
                      alt="selected"
                      src={mail}
                      className="w-5 h-5 fill-black -ml-1 -mr-1"
                    />

                    <p className="font-sans font-small mr-auto ml-2 flex-wrap p-1 ">
                      {selectedNotification1.value
                        ? selectedNotification1.value
                        : "Email notification"}
                    </p>
                    <img src={down} className="w-5 h-5 ml-auto mt-1" />
                  </div>

                  {isActiveNotification1 && (
                    <div className="dropdown-content font-sans z-0">
                      {notificationsTool1.map((option, idx) => (
                        <div
                          key={idx}
                          onClick={(e) => {
                            setSelectedNotification1(option);
                            setIsActiveNotification1(false);
                            //setSelType(option);
                          }}
                          className="dropdown-item flex flex-row font-big text-gray-600"
                        >
                          <img
                            alt="option"
                            src={option.img}
                            className="w-5 h-5 fill-black -mt-1"
                          />
                          <p className="font-sans font-small -mt-2 ml-2 mr-auto">
                            {option.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  name="time"
                  placeholder="15"
                  value={time}
                  required
                  className="w-16 text-center h-8 mt-1 mx-1 border-0 rounded text-gray-600 text-md font-med font-sans  focus:outline-none focus:ring-0 focus:border-blue-500"
                  onChange={(e) => setTime(e.target.value)}
                />

                <div className="dropdown w-1/4 h-8 mx-1">
                  <div
                    className="dropdown-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsActiveDuration(!isActiveDuration);
                    }}
                  >
                    {selectedDuration ? selectedDuration : "Minutes"}

                    <img src={down} className="w-5 h-5 ml-auto mt-1" />
                  </div>
                  {isActiveDuration && (
                    <div className="dropdown-content font-sans">
                      {durationTool.map((option, idx) => (
                        <div
                          key={idx}
                          onClick={(e) => {
                            setSelectedDuration(option);
                            setIsActiveDuration(false);
                            //setSelType(option);
                          }}
                          className="dropdown-item flex flex-row font-big text-gray-600"
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  className="material-icons-outlined text-gray-400 mx-2 mt-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setCount(count - 1);
                    handleCloseNotification(e);
                    setShowNotification1(false);
                  }}
                >
                  close
                </button>
              </div>
            )}

            {showNotification2 && (
              <div className="flex flex-row w-full font-sans">
                <div className="dropdown w-1/2 h-8 flex-none ">
                  <div
                    className="dropdown-btn flex-none "
                    onClick={(e) => {
                      e.preventDefault();
                      setIsActiveNotification2(!isActiveNotification2);
                    }}
                  >
                    <img
                      alt="selected1"
                      src={
                        selectedNotification2.img
                          ? selectedNotification2.img
                          : bell
                      }
                      className="w-5 h-5 fill-black -ml-1 -mr-1"
                    />

                    <p className="font-sans font-small mr-auto ml-2 flex-wrap p-1 ">
                      {selectedNotification2.value
                        ? selectedNotification2.value
                        : "On-screen notification"}
                    </p>
                    <img src={down} className="w-5 h-5 ml-auto mt-1" />
                  </div>
                  {isActiveNotification2 && (
                    <div className="dropdown-content font-sans">
                      {notificationsTool2.map((option, idx) => (
                        <div
                          key={idx}
                          onClick={(e) => {
                            setSelectedNotification2(option);
                            setIsActiveNotification2(false);
                            //setSelType(option);
                          }}
                          className="dropdown-item flex flex-row font-big text-gray-600"
                        >
                          <img
                            alt="option"
                            src={option.img}
                            className="w-5 h-5 fill-black -mt-1"
                          />
                          <p className="font-sans font-small -mt-2 ml-2 mr-auto">
                            {option.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  name="time"
                  placeholder="15"
                  value={time2}
                  required
                  className="w-16 text-center h-8 mt-1 mx-1 border-0 rounded text-gray-600 text-md font-med font-sans  focus:outline-none focus:ring-0 focus:border-blue-500"
                  onChange={(e) => setTime2(e.target.value)}
                />

                <div className="dropdown w-1/4 h-8 mx-1">
                  <div
                    className="dropdown-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsActiveDuration2(!isActiveDuration2);
                    }}
                  >
                    {selectedDuration2 ? selectedDuration2 : "Minutes"}

                    <img src={down} className="w-5 h-5 ml-auto mt-1" />
                  </div>
                  {isActiveDuration2 && (
                    <div className="dropdown-content font-sans">
                      {durationTool.map((option, idx) => (
                        <div
                          key={idx}
                          onClick={(e) => {
                            setSelectedDuration2(option);
                            setIsActiveDuration2(false);
                            //setSelType(option);
                          }}
                          className="dropdown-item flex flex-row font-big text-gray-600"
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  className="material-icons-outlined text-gray-400 mx-2 mt-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setCount(count - 1);
                    handleCloseNotification2(e);
                    setShowNotification2(false);
                  }}
                >
                  close
                </button>
              </div>
            )}

            <button
              className="flex flex-row bg-white rounded p-1 w-40 "
              disabled={!enable}
              onClick={(e) => {
                disableButton(e);
              }}
            >
              <img alt="add" src={add} className="w-5 h-5 ml-1 mr-2" />
              <p className="font-sans text-sm">Add Notification</p>
            </button>
            <p className="font-sans font-bold text-md pl-1 mt-4">
              Cancellation/reschedule time
            </p>
            <span className="flex flex-row font-sans bg-white text-sm w-full h-7 rounded">
              <p className="font-sans text-sm ml-2 mr-auto mt-1">
                1 hour before
              </p>
              <img src={down} className="w-5 h-5 ml-auto mt-1" />
            </span>
            <p className="font-sans font-bold text-md pl-1 mt-4">Guests</p>
            <div className="flex h-10 bg-white rounded-tl rounded-tr items-center">
              <img src={people} className="ml-2" />

              <input
                className="w-full h-10 pb-1.5 font-sans font-med opacity-50 text-md mr-10 text-primary border-none outline-white"
                type="text"
                name="name"
                placeholder="Add guests"
                //onChange={(e)=> set}
              />

              <button
                className="w-14 h-10 bg-gray-800 rounded focus:shadow-outline hover:bg-gray-400"
                //onClick={()}
              >
                <img src={search} className="ml-2" />
              </button>
            </div>

            <span className="w-full rounded-bl rounded-br h-40 overflow-hidden overflow-scroll scrollbar-hide border-gray-300 border-2 bg-white -mt-1">
              <span className="flex flex-row w-full m-2">
                <img src={person} className="w-6 h-6 " />
                <p className="font-sans text-sm ml-2 text-gray-400">
                  {selectedEvent.createdBy}
                </p>
                {getAvailability(selectedEvent.createdBy)}
              </span>
              {attendees.map((contact, idx) => (
                <span className="flex flex-row w-full m-2" key={idx}>
                  <img src={person} className="w-6 h-6 " />
                  <p className="font-sans text-sm ml-2 text-gray-400">
                    {contact.calendarId}
                  </p>
                  {getAvailability(contact)}
                </span>
              ))}
            </span>
            <div className="flex mt-1 ml-1">
              <input
                type="checkbox"
                className={`form -checkbox h-5 w-5 mr-2 bg-gray-100 text-black rounded focus: ring-1 cursor-pointer`}
              />
              <p className="font-sans text-sm text-gray-500">
                Send email invitations to guests
              </p>
            </div>
            <p className="font-sans font-bold text-md pl-1 mt-4">
              Closest common free slots
            </p>

            <div className="flex flex-row py-2 justify-self-auto">
              <p className="font-sans text-sm w-48 mr-auto truncate px-1">
                {startDaySelected.format("MMMM DD, dddd")}
              </p>
              <span className="bg-white rounded font-inter text-sm w-32 text-center mx-2 ml-auto">
                12:00 - 13:00
              </span>
              <span className="bg-white rounded font-inter text-sm w-32 text-center ml-auto">
                16:00 - 17:00
              </span>
            </div>

            <div className="flex flex-row justify-self-auto">
              <p className="font-sans text-sm w-48 mr-auto truncate px-1">
                {getNextDay(startDaySelected)}
              </p>
              <span className="bg-white rounded font-inter text-sm w-32 mx-2 text-center ml-auto">
                12:00 - 13:00
              </span>
              <span className="bg-white rounded font-inter text-sm w-32 text-center ml-auto">
                16:00 - 17:00
              </span>
            </div>

            <p className="font-sans font-bold text-md pl-1 mt-4">
              Guest permissions
            </p>

            <div className="flex mt-1 ml-1">
              <input
                type="checkbox"
                className={`form -checkbox h-5 w-5 mr-2 bg-gray-100 text-black rounded focus: ring-1 cursor-pointer`}
              />
              <p className="font-sans text-sm text-black">Update event</p>
            </div>

            <div className="flex mt-1 ml-1">
              <input
                type="checkbox"
                className={`form -checkbox h-5 w-5 mr-2 bg-gray-100 text-black rounded focus: ring-1 cursor-pointer`}
              />
              <p className="font-sans text-sm text-black">Invite others</p>
            </div>
            <div className="flex mt-1 ml-1">
              <input
                type="checkbox"
                className={`form -checkbox h-5 w-5 mr-2 bg-gray-100 text-black rounded focus: ring-1 cursor-pointer`}
              />
              <p className="font-sans text-sm text-black">See guest list</p>
            </div>

            <p className="font-sans font-bold text-md pl-1 mt-4">
              Order ID or link
            </p>
            <input
              type="text"
              name="orderid"
              placeholder=""
              //value={orderid}
              //required
              className="m-1 p-1 w-full bg-gray-100 border-0 rounded text-gray-600 text-md font-med font-sans border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => {
                return null;
              }}
            />

            <div className="flex my-2">
              <Switch
                className="react-switch mr-2"
                onChange={() => setPrivateChecked(!privateChecked)}
                checked={privateChecked}
                onColor={"#6E276C"}
                uncheckedIcon={false}
                checkedIcon={false}
                width={48}
              />
              <p className="font-sans text-sm mt-0.5"> Private </p>

              <div className="rounded-full bg-gray-500 w-5 h-5 mt-0.5 ml-2 pl-2 -pt-1 text-sm text-white font-inter">
                <button>i</button>
              </div>
            </div>

            <div className="flex my-2">
              <Switch
                className="react-switch mr-2"
                onChange={() => setBusyChecked(!busyChecked)}
                checked={busyChecked}
                onColor={"#6E276C"}
                uncheckedIcon={false}
                checkedIcon={false}
                width={48}
              />
              <p className="font-sans text-sm mt-0.5"> Busy </p>

              <div className="rounded-full bg-gray-500 w-5 h-5 mt-0.5 ml-2 pl-2 -pt-1 text-sm text-white font-inter">
                <button>i</button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-10">{""}</div>

        <footer className=" flex bg-gray-300 rounded border-t w-2/5 mt-12 z-30 fixed bottom-0">
          <button
            type="cancel"
            className="bg-white w-[15em] rounded font-sans mx-2 text-base grow-0 hover:bg-white hover:drop-shadow-xl text-black my-2 mr-auto"
            onClick={() => {
              setShowEventModal(false);
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!activateSubmit}
            className="footer hover font-sans text-base text-white my-2 mx-2 ml-auto hover:drop-shadow-xl"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            <img alt="add" src={save} className="w-5 h-5 ml-1 mr-2" />
            <p className="font-sans text-sm">Save</p>
          </button>
        </footer>
      </form>
    </div>
  );
}

/*<span className="material-icons-outlined text-gray-400">
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
            </div>*/

/*
                    {selectedNotification1.value === ""
                      ? "Select One"
                      : `${selectedNotification1.value}`}
                    */
