const router = require("express").Router();
const fs = require("fs");

router.get("/notes", (req, res) => {
  fs.readFile("./db.json", "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

router.post("/notes", (req, res) => {
  fs.readFile("./db.json", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);

    const newNote = JSON.parse(data);

    newNote.push({
      title: req.body.title,
      text: req.body.text,
    });

    fs.writeFile("./db.json", JSON.stringify(newNote), (err) => {
      if (err) return res.JSON({ err: "Problem adding notes" });
      res.json({ msg: "Successfully added new note" });
    });
  });
});

module.exports = router;
