import { useEffect, useState } from "react";
import "./form.css"
const api_base = "http://localhost:3001";

function Form() {
  const [argonautes, setArgonautes] = useState([]);
  const [newArgonaute, setNewArgonaute] = useState("");

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

  return (
    <main>
   
      <h2>Ajouter un(e) Argonaute</h2>
     
     
      <form class="new-member-form">
         <label for="name">Nom de l&apos;Argonaute</label>
         <input
          onChange={(e) => {
            setNewArgonaute(e.target.value);
          }}
          id="name" name="name"  type="text" placeholder="Charalampos"
          value={newArgonaute}
        />
         <button type="submit"  onClick={addArgonaute} >Envoyer</button>
      </form>


      
      <div>

      <h2>Membres de l'équipage</h2>
      <section >
         <ul class="member-list">
          {argonautes.map((argonaute, index) => (
            <li className="member-item">{argonaute.name}</li>
          ))}
         </ul>
      </section>
      </div>


    </main>
  );
}

export default Form;

