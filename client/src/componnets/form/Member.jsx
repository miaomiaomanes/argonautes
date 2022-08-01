import React, { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';

import ModeEdit from "@mui/icons-material/ModeEdit";


function Member(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [argonaute, setArgonaute] = useState();

  const handleUpdate = (evt) => {
    evt.preventDefault();

    props.edit();
   
    setIsEditing(false);
  };

  console.log(props)

  return (
    <div>
      <li className="member-item">
        {props.name}
        <button
          className="delete-member"
          onClick={() => props.remove()}
        >
       <ClearIcon />
        </button>
        <button
          className="delete-member"
          onClick={() => {
            setIsEditing(true);
          }}
        >
        <ModeEdit />
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
