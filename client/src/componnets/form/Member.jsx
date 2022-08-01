import React, { useState } from "react";


function Member(props){
    const [isEditing, setIsEditing]= useState(false);
    const [argonaute,setArgonaute] = useState();
     

    const handleUpdate = (evt) => {
        evt.preventDefault();
    
        props.edit(props.id, argonaute);
        setIsEditing(false);
        
      };



return (
  <div>
    <li className="member-item">
      {props.name}
      <button
        className="delete-member"
        onClick={() => props.remove(props.id)}
      >
        x
      </button>
      <button
        className="delete-member"
        onClick={() => {
          setIsEditing(true);
        }}
      >
        ?
      </button>
    </li>
    {isEditing && (
      <div>
        <input
          onChange={(e) => {
            setArgonaute(e.target.value);
          }}
          id="name"
          name="name"
          type="text"
          placeholder="new name"
          value={argonaute}
        />
        <button onClick={handleUpdate}>Save</button>
      </div>
    )}
  </div>
);
 





}

export default Member;