const express = require("express");
const Task = require("../models/task-model");
const auth = require("../app/middleware/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("user", "username");
    res.send(tasks);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const task = new Task(req.body);
    task.user = req.user.id;
    await task.save();
    res.send(task);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});
router.delete("/:id", auth, async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete({ _id: req.params.id });
    if (result) {
      res.send({ message: "Task deleted succesfully" });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {}
});

module.exports = router;
