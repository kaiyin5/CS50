const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = require('./task');

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: String,
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Task'
            }
        ]
    },
    {
        timestamps: true,
    }
);

// findOneAndDelete is the middleware 'paired with' and triggered by 'findByIdAndDelete'
CategorySchema.post('findOneAndDelete', async function (doc) {
    // if target document exist
    if (doc) {
        // removing tasks ..
        await Task.deleteMany({
            // which their id is included in the category(doc).reviews
            _id: {
                $in: doc.tasks
            }
        })
    }
});

module.exports = mongoose.model('Category', CategorySchema);