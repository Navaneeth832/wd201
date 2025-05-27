const express = require("express");
const path = require("path");
const { Todo } = require("./models");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.get("/", async function (request, response) {
  try {
    const todos = await Todo.findAll(); 
    return response.render("index", { todos });
  } catch (error) {
    console.error(error);
    return response.status(500).send("Error rendering todos");
  }
});

app.get("/todos", async function (_request, response) {
  try {
    const todos = await Todo.findAll(); 
    return response.json(todos); 
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Failed to fetch todos" });
  }
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
    const todo = await Todo.addTodo(request.body);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  try {
    const deletedCount = await Todo.destroy({
      where: {
        id: request.params.id,
      },
    });

    if (deletedCount === 1) {
      return response.send(true); 
    } else {
      return response.send(false); 
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Failed to delete todo" });
  }
});

module.exports = app;
