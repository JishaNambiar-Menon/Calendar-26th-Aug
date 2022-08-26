import { useLoadScript } from "@react-google-maps/api";
import Map from "./Map";
import "../App.css";

export default function Location(){
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "AIzaSyCeWvrC2eTAluXvWhXmRF06I6an3dt7Vac",
      libraries: ["places"],
    });

    if(!isLoaded) return <div>Loading...</div>
    return<Map/>
}