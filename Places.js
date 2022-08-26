import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import "../App.css"
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";



export default function Places({ setOffice, setOfficeVal }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const {selectedEvent} = useContext(GlobalContext)

  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    console.log("results", results[0])
    const { lat, lng } = await getLatLng(results[0]);
    setOffice({ lat, lng });
    setOfficeVal(val);
  };

  return (
    <div className="flex flex-end">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          className="combobox-input"
          placeholder="Enter your address"
        />
        <ComboboxPopover>
          <ComboboxList className="pac-container">
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
      
    </div>
  );
}
