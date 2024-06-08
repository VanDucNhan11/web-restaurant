const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    applicationDeadlineStart: {
        type: Date,
        required: true
    },
    applicationDeadlineEnd: {
        type: Date,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;
