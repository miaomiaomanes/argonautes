const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Name = require("./models/name");

const app = express();

app.use(express.json());
app.use(cors());

const CONNECTION_URL =
  "mongodb+srv://miaomiao:valentin520%40@todolist.c3zwr.mongodb.net/";

const PORT = process.env.PORT || 3001;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true },)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));




// models

const Name1 = new Name({
  name: "Eleftheria",
});
const Name2 = new Name({
  name: "Gennadios",
});
const Name3 = new Name({
  name: "Lysimachos",
});

const defaultNames = [Name1, Name2, Name3];

app.get("/name", async (req, res) => {
  const names = await Name.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Name.insertMany(defaultNames, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("sucessfully save defaulted items to database");
        }
      });
    }
  });
  res.json(names);
});

app.post("/name/new", async (req, res) => {
  const name = new Name({
    name: req.body.name,
  });

  await name.save();

  res.json(name);
});

app.delete('/name/delete/:id', async (req, res) => {
	const result = await Name.findByIdAndDelete(req.params.id);

	res.json({result});
});


app.put('/name/update/:id', async (req, res) => {
	const name = await Name.findById(req.params.id);

	name.name = req.body.name;

	todo.save();

	res.json(name);
});