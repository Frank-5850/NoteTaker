const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const database = path.join(__dirname, "../db/db.json");

console.log(database);

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
    });

    fs.writeFile(database, JSON.stringify(newNote), (err) => {
      if (err) return res.JSON({ err: "Problem adding notes" });
      res.json({ msg: "Successfully added new note" });
    });
  });
});

module.exports = router;
