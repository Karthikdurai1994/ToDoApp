const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;
require("./db/mongoose");
const tasks = require("./models/tasks");

//Default API
app.get("", (req, res) => {
  res.send("Welcome");
});

//Create Tasks API
app.post("/createTask", async (req, res) => {
  const body = req.body;
  const task = new tasks({
    title: req.body.title,
    subTasks: req.body.subtask,
    status: req.body.status,
  });
  try {
    await task.save();
    res.status(201).send({
      task: task,
    });
  } catch (e) {
    res.send(e);
  }
});

//Update Task API
app.post("/updateTask/:id", async (req, res) => {
  const ID = req.params.id;
  const subTaskID = req.body.subTaskID;
  const subTaskNewName = req.body.subTaskNewName;
  try {
    const task = await tasks.findById(ID);
    task.subTasks.forEach((t) => {
      if (t.id === subTaskID) {
        t.task = subTaskNewName;
      }
    });
    await task.save();
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.send(e);
  }
});

//Delete Task API
app.post("/deleteTask/:id", async (req, res) => {
  const ID = req.params.id;
  const subTaskID = req.body.subTaskID;
  try {
    const task = await tasks.findById(ID);
    t1 = task.subTasks.filter((t) => {
      console.log(t);
      return t.id != subTaskID;
    });
    task.subTasks = t1;
    await task.save();
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.send(e);
  }
});

app.listen(port, () => {
  console.log("Server is listening on Port: " + port);
});
