const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const database = path.join(__dirname, "../db/db.json");
const { v4: uuidv4 } = require("uuid");
const id = uuidv4();

console.log({ v4: uuidv4 });
console.log(id);

router.get("/notes", (req, res) => {
  console.log("hello");
  fs.readFile(database, "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
    const readData = JSON.parse(data);
    res.send(readData);
  });
});

router.post("/notes", (req, res) => {
  fs.readFile(database, "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);

    const newNote = JSON.parse(data);

    newNote.push({
      title: req.body.title,
      text: req.body.text,
      id: id,
    });

    fs.writeFile(database, JSON.stringify(newNote), (err) => {
      if (err) return res.JSON({ err: "Problem adding notes" });
      res.json({ msg: "Successfully added new note" });
    });
  });
});

module.exports = router;
