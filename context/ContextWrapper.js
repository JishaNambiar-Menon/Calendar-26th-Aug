import React, { useEffect, useReducer, useState, useMemo } from 'react';
import GlobalContext from './GlobalContext';
import dayjs from 'dayjs';
import axios from 'axios';

/*function savedEventsReducer(state, {type, payload}){
  switch (type) {
    case 'push':
      return [...state, payload]
    case 'update':
      return state.map((evt) => evt.id === payload.id ? payload : evt)
    case 'delete':
      return state.filter((evt) => evt.id !== payload.id)
    default:
      throw new Error();
  }
}
*/

export default function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month())
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null)
    const [daySelected, setDaySelected] = useState(dayjs());
    const [startDaySelected, setStartDaySelected] = useState(dayjs());
    //const [startDaySelected, setStartDaySelected] = useState(dayjs());
    const [endDaySelected, setEndDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [showDatePicker, setDatePicker] = useState(false);
    const [showDatePicker1, setDatePicker1] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    
    const [labels, setLabels] = useState([])
    const [events, setEvents] = useState([])
    const [savedEvents, setSavedEvents] = useState([])
    const [tempStart, setTempStart] = useState([]);
    const [tempEnd, setTempEnd] = useState([]);
    const [showMap, setShowMap] = useState(false);
    const [officeVal, setOfficeVal] = useState(null)
    const [office, setOffice] = useState(null);
   // const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents)
    
    //returns an array
    /*const filteredEvents = useMemo(() => {
      return savedEvents.filter();
    }, [savedEvents])
    useEffect(()=> {
      localStorage.setItem("savedEvents", JSON.stringify(savedEvents))
    }, [savedEvents])*/

 useEffect(() => {
   const fetchEvents = async () => {
     try {
       const response = await axios.get("http://localhost:3005/event", {
         responseType: "json",
       });
       setSavedEvents(response.data);
       console.log(response.data);
     } catch (err) {
       if (err.response) {
         // Not in the 200 response range
         console.log(err.response.data);
         console.log(err.response.status);
         console.log(err.response.headers);
       } else {
         console.log(`Error: ${err.message}`);
       }
     }
   };

   fetchEvents();
 }, []);


    useEffect(() => {
      if (smallCalendarMonth !== null) {
        setMonthIndex(smallCalendarMonth);
      }
    }, [smallCalendarMonth]);

    useEffect(()=> {
      if (tempStart.length !== 0) {
        //setEventStart(eventStart.set("hour", temp[0]).set("minute", temp[1]));
        setStartDaySelected(
          startDaySelected.set("hour", tempStart[0]).set("minute", tempStart[1])
        );
        // setNewDate(newDate.set("hour", temp[0]).set("minute", temp[1]));
      }
    })


    useEffect(()=> {
      if (tempEnd.length !== 0) {
        //setEventStart(eventStart.set("hour", temp[0]).set("minute", temp[1]));
        setEndDaySelected(
          endDaySelected.set("hour", tempEnd[0]).set("minute", tempEnd[1])
        );
        // setNewDate(newDate.set("hour", temp[0]).set("minute", temp[1]));
      }
    })

    useEffect(() => {
      if(!showEventModal){
        setSelectedEvent(null)
      }
    }, [showEventModal])

    //displaying the label colorsk
    /*useEffect(() => {
      setLabels((prevLabels) => {
        return [...new Set(savedEvents.map(evt => evt.label))].map(label => {
          const currentLabel = prevLabels.find(lbl => lbl.label === label)
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true
          }
        })
      }) 
    }, [savedEvents]);

    function updateLabel(label){
      setLabels(labels.map((lbl)  => lbl.label === label.label ? label : lbl ))
    }*/

    return (
      <GlobalContext.Provider
        value={{
          monthIndex,
          setMonthIndex,
          smallCalendarMonth,
          setSmallCalendarMonth,
          daySelected,
          setDaySelected,
          startDaySelected,
          setStartDaySelected,
          endDaySelected,
          setEndDaySelected,
          showEventModal,
          setShowEventModal,
          showDatePicker,
          setDatePicker,
          showDatePicker1,
          setDatePicker1,
          selectedEvent,
          setSelectedEvent,
          //dispatchCalEvent,
          savedEvents,
          setLabels,
          labels,
          tempEnd,
          tempStart,
          setTempEnd,
          setTempStart,
          showMap,
          setShowMap,
          officeVal,
          setOfficeVal,
          office,
          setOffice
         // updateLabel,
         // filteredEvents,
        }}
      >
        {props.children}
      </GlobalContext.Provider>
    );
}
