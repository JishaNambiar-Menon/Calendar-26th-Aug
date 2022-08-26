import { useState, useMemo, useCallback, useRef, useContext } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  InfoWindow,
  wi
} from "@react-google-maps/api";
import Places from "./Places";
import "../App.css"
import Modal from "react-modal";
import GlobalContext from "../context/GlobalContext";


export default function Map() {
    const {office, setOffice, selectedEvent} = useContext(GlobalContext);

  const {officeVal, setOfficeVal} = useContext(GlobalContext);
  const mapRef = useRef();
  const lat = selectedEvent.location[0].coordinates[0].lat? selectedEvent.location[0].coordinates[0].lat : 0;
  const lng = selectedEvent.location[0].coordinates[0].lng
    ? selectedEvent.location[0].coordinates[0].lng
    : 0;
  const center = useMemo(
    () => ({lat,lng}),
    []
  );
  const options = useMemo(
    () => ({
      
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  
  console.log(officeVal)
    return (
      <div className="map-container z-50">
        <>
          <div className="flex flex-col">
            <Places
              setOffice={(position) => {
                setOffice(position);
                mapRef.current?.panTo(position);
              }}
              setOfficeVal={(val) => {
                setOfficeVal(val);
              }}
            />
          </div>

          <div className="map">
            <GoogleMap
              zoom={10}
              center={center}
              mapContainerClassName="map-container"
              options={options}
              onLoad={onLoad}
            >
              {office && (
                <>
                  <InfoWindow
                    //onClose={this.onInfoWindowClose}
                    position={{ lat: office.lat + 0.001, lng: office.lng }}
                  >
                    <>
                      <p className="text-red-500 font-serif truncate text-sm">
                        {selectedEvent.title}
                        <br />
                      </p>
                      <p className="text-blue-500 italic font-serif truncate text-sm">
                        {" "}
                        {officeVal}
                      </p>
                    </>
                  </InfoWindow>
                  <Marker position={office} />
                </>
              )}
            </GoogleMap>
          </div>
        </>
      </div>
    );

}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: true,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};
