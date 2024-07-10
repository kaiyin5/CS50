const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require('../utils/catchAsync');
const Category = require('../models/category');

// /category/...
router.route('/')
    .get(catchAsync(async (req, res) => {
        const categories = await Category.find({}).populate('tasks');
        res.send(categories);
    }))
    .post(catchAsync(async (req, res) => {
        const category = new Category(req.body);
        await category.save();
        return res.send({ message: 'Piece created successfully' });
    }))

router.route('/:id')
    .get(catchAsync(async (req, res) => {
        const { id } = req.params;
        const category = await Category.findById(id).populate('tasks');
        res.send(category);
    }))
    .put(catchAsync(async (req, res) => {
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(id, { ...req.body });
        return res.send({ message: 'Piece edited successfully' });
    }))
    .delete(catchAsync(async (req, res) => {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        return res.send({ message: 'Piece deleted successfully' });
    }))

module.exports = router;