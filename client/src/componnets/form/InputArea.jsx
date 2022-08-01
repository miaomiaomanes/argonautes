import React, { useState } from "react";
const api_base = "http://localhost:3001";

function InputArea(props) {
    const [newArgonaute, setNewArgonaute] = useState("");


  function handleChange(event) {
    event.preventDefault();
    const newValue = event.target.value;
    setNewArgonaute(newValue);

  }

  //

  return (
    <div className="form">
      <input onChange={handleChange} 
          id="name"
          name="name"
          type="text"
          placeholder="Charalampos"
          value={newArgonaute} />
      <button
        onClick={() => {
          props.onAdd(newArgonaute);
          setNewArgonaute("");
        }}
      >
        Envoyer
      </button>
    </div>
  );
}

export default InputArea;

