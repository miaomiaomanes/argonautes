const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Name = require("./models/name");

const app = express();

app.use(express.json());

// const corsOptions ={
//   origin:'*',
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200,
// }

app.use(cors());

const CONNECTION_URL = process.env.MONGO_URL;

const PORT = process.env.PORT || 3001;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
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
  const members = await Name.find({}, function (err, foundItems) {
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
  res.json(members);
});

app.post("/name/new", async (req, res) => {
  const member = new Name({
    name: req.body.name,
  });

  await member.save();

  res.json(member);
});

app.delete("/name/delete/:id", async (req, res) => {
  const result = await Name.findByIdAndDelete(req.params.id);

  res.json({ result });
});

app.put("/name/update/:id", async (req, res) => {
  const member = await Name.findById(req.params.id);
  console.log(member);

  member.name = req.body.name;

  member.save();

  res.json(member);
});
