  const Task = require('../models/Task');

  exports.createTask = async (req, res) => {
    await Task.create({...req.body, owner:req.user._id});
    res.json(Task)
  };
/// get my tasks
  exports.getMyTask = async (req, res) => {
    const tasks = await Task.find({owner:req.user._id})
    res.json(Task)
  };

  // get all tasks
  exports.getAllTask = async (req, res) => {
    const task = await Task.find().populate('owner', 'email');
    res.json(Task);
  };
  
  


