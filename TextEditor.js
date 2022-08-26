import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";




const TextEditor = () => {
  const [show, setShow] = useState("Thank you");
  const modules = {
    toolbar: [
      [{ size: [] }],
      ["bold", "italic", "underline"],
      ["link", "image"],
    ],
  };
  const formats = ["size", "bold", "italic", "underline", "link", "image"];

  
  return (
    <div >
      
        <ReactQuill
          theme="snow"
          value={show}
          modules={modules}
          formats={formats}
          
          
          onChange={(val) => {
            setShow(val)
            
          }}
        />
      
    </div>
  );
};

export default TextEditor;

