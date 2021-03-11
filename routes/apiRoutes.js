const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const database = path.join(__dirname, "../db/db.json");
const { v4: uuidv4 } = require("uuid");
const id = uuidv4();

router.get("/notes", (req, res) => {
  fs.readFile(database, "utf8", (err, data) => {
    if (err) throw err;
    const readData = JSON.parse(data);
    res.send(readData);
  });
});

router.post("/notes", (req, res) => {
  fs.readFile(database, "utf8", (err, data) => {
    if (err) throw err;

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

router.delete("/notes/:id", (req, res) => {
  console.log("hello");
  fs.readFile(database, "utf8", (err, data) => {
    const deleteID = req.params.id;

    dbData = JSON.parse(data);

    const deleteData = dbData.filter((data) => data.id !== deleteID);

    fs.writeFile(database, JSON.stringify(deleteData), (err) => {
      if (err) return res.JSON({ err: "Problem deleting notes" });
      res.json({ msg: "Successfully deleted note" });
    });
  });
});
module.exports = router;
