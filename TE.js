import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import App from '../App';


export default function TE() {
    const[body,setBody] = useState("")

    

  return (
    <div className='App'>
        <ReactQuill
            placeholder='Write Something...'
            modules={App.modules}
            formats={App.formats}
            onChange={(e)=> {setBody(e)}}
            value={body}
        />
    </div>
  )
}

App.modules = {
    toolbar: [
        [{size: []}],
        ["bold", "italic", "underline"],
        ["link", "image"]
    ]
};

App.formats = [
"size",
    "bold",
    "italic",
    "underline",
    "link",
    "image"
]
    

