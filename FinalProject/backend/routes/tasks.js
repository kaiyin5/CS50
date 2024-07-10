const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require('../utils/catchAsync');
const Category = require('../models/category');
const Task = require('../models/task');

// /category/:id/task/...

router.route('/')
    .post(catchAsync(async (req, res) => {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        const task = new Task(req.body);
        task.category = categoryId;
        category.tasks.push(task);
        await task.save();
        await category.save();
        return res.send({ message: 'Task created successfully' });
    }));

router.route('/:taskId')
    .get(catchAsync(async (req, res) => {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);
        res.send(task);
    }))
    .put(catchAsync(async (req, res) => {
        const { taskId } = req.params;
        await Task.findByIdAndUpdate(taskId, { ...req.body })
        return res.send({ message: 'Task created successfully' });
    }))
    .delete(catchAsync(async (req, res) => {
        const { id, taskId } = req.params;
        const category = await Category.findByIdAndUpdate(id, { $pull: { tasks: taskId } });
        await Task.findByIdAndDelete(taskId);
        return res.send({ message: 'Task created successfully' });
    }))


module.exports = router;