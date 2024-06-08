const Job = require('../models/Recruitment.model');

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Công việc không tồn tại" });
        }
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createJob = async (req, res) => {
    try {
        const jobData = { ...req.body };
        if (req.file) {
            jobData.image = req.file.path; // Lưu đường dẫn file
        }
        const newJob = new Job(jobData);
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const jobData = { ...req.body };
        if (req.file) {
            jobData.image = req.file.path; // Cập nhật đường dẫn file mới
        }
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, jobData, { new: true });
        if (!updatedJob) {
            return res.status(404).json({ message: "Công việc không tồn tại" });
        }
        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Công việc không tồn tại" });
        }

        await job.remove();
        res.json({ message: "Xóa công việc thành công" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
