const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: String,
        duration: {
            type: Number,
            // converting to integer
            get: v => Math.round(v),
            set: v => Math.round(v),
            alias: 'i',
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Task', TaskSchema);