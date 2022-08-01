import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./form.css";
import InputArea from "./InputArea";
import Member from "./Member";

const api_base = "http://localhost:3001";

function MembersList() {
  const [argonautes, setArgonautes] = useState([]);

  useEffect(() => {
    GetArgonautes();
  }, []);

  const GetArgonautes = () => {
    fetch(api_base + "/name")
      .then((res) => res.json())
      .then((data) => setArgonautes(data))
      .catch((err) => console.error("Error: ", err));
  };

  const addArgonaute = async (newArgonaute) => {
    const response = await fetch(api_base + "/name/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newArgonaute,
      }),
    });

    const data = await response.json();

    setArgonautes([...argonautes, data]);
  };

  const deleteMember = async (id) => {
    const data = await fetch(api_base + "/name/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());
    setArgonautes(
      argonautes.filter((member) => member._id !== data.result._id)
    );
  };

  const updateMember = async (id, argonauteName) => {
    const data = await fetch(api_base + "/name/update/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newArgonaute,
      }),
    }).then((res) => res.json());

    const update = argonautes.map((member) => {
      if (member._id === data.result._id) {
        console.log(data.result._id);

        return argonauteName;
      }
      return member;
    });
    setArgonautes(update);
  };

  return (
    <main>
      <InputArea onAdd={addArgonaute} />
      <section>
        <ul class="member-list">
          {argonautes.map((argonaute, index) => (
            <Member
              key={index}
              id={index}
              name={argonaute.name}
              remove={() => deleteMember(argonaute._id)}
              edit={() => updateMember(argonaute._id, argonaute.name)}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default MembersList;
