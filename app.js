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
    var subTask = task.subTasks.find((t) => {
      return t.id === subTaskID;
    });
    task[subTaskID] = subTaskNewName;
    await task.save();
    //console.log("T1", t1);

    res.send(subTask);
  } catch (e) {
    res.send(e);
  }
});

app.listen(port, () => {
  console.log("Server is listening on Port: " + port);
});
