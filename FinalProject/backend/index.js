// Packages
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

// External Local Files
const { PORT, mongoDBURL } = require('./config');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const Category = require('./models/category');

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongoDBURL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log(`Database connected: ${mongoDBURL}/`);
})

// Middleware to handle CORS policy
app.use(cors());

app.get('/', (req, res) => {
    res.send('Home');
});

// Category Routes
const categoryRoutes = require('./routes/categories')
app.use('/category', categoryRoutes)

// Task Routes
const taskRoutes = require('./routes/tasks')
app.use('/category/:id/task', taskRoutes)

// applicable to every unfound request (methods, path, ...)
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

// generic error handler - middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'something went wrong' } = err;
    if (!err.message) err.message = message;
    res.status(statusCode).send(`${statusCode} ${message}`);
})

// Connect to server
app.listen(PORT, () => {
    console.log(`Serving at: http://localhost:${PORT}/`);
})