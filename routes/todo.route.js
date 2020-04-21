const express = require("express");
const shortid = require("shortid");

const db = require("../db.js");

const router = express.Router();

router.get("/", (req, res) => {
  let q = req.query.q;
  let matchedTodos;
  let todosList = db.get("todos").value();

  if (q) {
    matchedTodos = todosList.filter(
      todo => todo.text.toLowerCase().indexOf(q.toLowerCase()) !== -1
    );
  } else {
    matchedTodos = todosList;
  }

  res.render("todos", {
    todosList: matchedTodos,
    q: q
  });
});

router.post("/create", (req, res) => {
  req.body.id = shortid.generate();

  db.get("todos")
    .push(req.body)
    .write();
  res.redirect("back");
});

router.get("/:id/delete", (req, res) => {
  let id = req.params.id;

  db.get("todos")
    .remove({ id: id })
    .write();

  res.redirect("back");
});

module.exports = router;
