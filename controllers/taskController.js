const Task = require('../models/Task');

exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title || title.length < 3) {
      return res.status(422).json({ success: false, data: null, error: 'Title must be at least 3 characters' });
    }
    const task = new Task({ title, description, user: req.user });
    await task.save();
    res.status(201).json({ success: true, data: task, error: null });
  } catch (err) {
    next(err);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json({ success: true, data: tasks, error: null });
  } catch (err) {
    next(err);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user });
    if (!task) {
      return res.status(404).json({ success: false, data: null, error: 'Task not found' });
    }
    res.json({ success: true, data: task, error: null });
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    if (title && title.length < 3) {
      return res.status(422).json({ success: false, data: null, error: 'Title must be at least 3 characters' });
    }
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { title, description, completed },
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ success: false, data: null, error: 'Task not found' });
    }
    res.json({ success: true, data: task, error: null });
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!task) {
      return res.status(404).json({ success: false, data: null, error: 'Task not found' });
    }
    res.json({ success: true, data: { deleted: true }, error: null });
  } catch (err) {
    next(err);
  }
};
