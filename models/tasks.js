const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    title: { type: "String" },
    subTasks: [
      {
        task: {
          type: "String",
        },
      },
    ],
    status: { type: "String" },
  },
  { timestamps: true }
);
const task = mongoose.model("Tasks", taskSchema);
module.exports = task;
