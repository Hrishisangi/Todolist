require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');
const { Validator } = require('node-input-validator');

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));


app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email.trim().toLowerCase() === "hrishitha@gmail.com" && password === "Welcome@123") {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: "Unauthorized user" });
    }
});


app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err));
});


app.post('/add', async (req, res) => {
    const v = new Validator(req.body, {
        task: 'required|string|minLength:3'
    });

    const matched = await v.check();
    if (!matched) {
        return res.status(422).json({ errors: v.errors });
    }

    const task = req.body.task;
    TodoModel.create({ task })
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err));
});


app.put('/update/:id', (req, res) => {
    const { id } = req.params;

    TodoModel.findByIdAndUpdate(id, { done: true }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err));
});


app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    TodoModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err));
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
