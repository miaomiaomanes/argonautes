import { useEffect, useState } from "react";
import "./form.css";
const api_base = "http://localhost:3001";

function Form() {
  const [argonautes, setArgonautes] = useState([]);
  const [newArgonaute, setNewArgonaute] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    GetArgonautes();
  }, []);

  const GetArgonautes = () => {
    fetch(api_base + "/name")
      .then((res) => res.json())
      .then((data) => setArgonautes(data))
      .catch((err) => console.error("Error: ", err));
  };

  const addArgonaute = async (e) => {
    e.preventDefault();
    const data = await fetch(api_base + "/name/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newArgonaute,
      }),
    }).then((res) => res.json());

    setArgonautes([...argonautes, data]);

    setNewArgonaute("");
  };

  const deleteMember = async (id) => {
    const data = await fetch(api_base + "/name/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());
    setArgonautes(
      argonautes.filter((member) => member._id !== data.result._id)
    );
  };

  const updateMember = async (id, argonaute) => {
    const data = await fetch(api_base + "/name/update/" + id, {
      method: "PUT",
    }).then((res) => res.json());

    const update = argonautes.map((member) => {
      if (member._id === data.result._id) {
        return argonaute;
      }
      return member;
    });
    setArgonautes(update);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(newArgonaute);
    updateMember(newArgonaute._id, newArgonaute);
    console.log(newArgonaute._id, newArgonaute);
    setIsEditing(false);
  };

  return (
    <main>
      <h2>Ajouter un(e) Argonaute</h2>

      <form class="new-member-form">
        <label for="name">Nom de l&apos;Argonaute</label>
        <input
          onChange={(e) => {
            setNewArgonaute(e.target.value);
          }}
          id="name"
          name="name"
          type="text"
          placeholder="Charalampos"
          value={newArgonaute}
        />
        <button type="submit" onClick={addArgonaute}>
          Envoyer
        </button>
      </form>

      <div>
        <h2>Membres de l'équipage</h2>
        <section>
          <ul class="member-list">
            {argonautes.map((argonaute, index) => (
              <li className="member-item">
                {argonaute.name}
                <button
                  className="delete-member"
                  onClick={() => deleteMember(argonaute._id)}
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
            ))}
          </ul>
          {isEditing && (
            <div>
              <input
                onChange={(e) => {
                  setNewArgonaute(e.target.value);
                }}
                id="name"
                name="name"
                type="text"
                placeholder={newArgonaute}
                value={newArgonaute}
              />
              <button onClick={handleUpdate}>Save</button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Form;
