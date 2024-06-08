import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecruitmentUpdate = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    applicationDeadlineStart: '',
    applicationDeadlineEnd: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    fetchJobs();
    if (!editingJob) {
      setFormData({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        applicationDeadlineStart: '',
        applicationDeadlineEnd: '',
      });
      setSelectedFile(null);
    }
  }, [editingJob]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/recruitments');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      if (selectedFile) {
        data.append('image', selectedFile);
      }

      if (editingJob) {
        await axios.put(`http://localhost:3000/api/v1/recruitments/${editingJob._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        const updatedJobs = jobs.map(job => {
          if (job._id === editingJob._id) {
            return { ...job, ...formData, image: selectedFile ? URL.createObjectURL(selectedFile) : job.image };
          }
          return job;
        });
        setJobs(updatedJobs);
      } else {
        const response = await axios.post('http://localhost:3000/api/v1/recruitments', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setJobs([...jobs, response.data]);
      }

      setFormData({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        applicationDeadlineStart: '',
        applicationDeadlineEnd: '',
      });
      setSelectedFile(null);
      setEditingJob(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/recruitments/${id}`);
      setJobs(jobs.filter(job => job._id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const populateFormData = (job) => {
    setFormData({
      title: job.title || '',
      description: job.description || '',
      requirements: job.requirements || '',
      salary: job.salary || '',
      applicationDeadlineStart: job.applicationDeadlineStart ? job.applicationDeadlineStart.split('T')[0] : '',
      applicationDeadlineEnd: job.applicationDeadlineEnd ? job.applicationDeadlineEnd.split('T')[0] : '',
    });
    setSelectedFile(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center title-1 title-font">Danh sách bài viết tuyển dụng</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Thêm
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-2 px-4 border">Tiêu đề</th>
              <th className="py-2 px-4 border">Mô tả công việc</th>
              <th className="py-2 px-4 border">Yêu cầu công việc</th>
              <th className="py-2 px-4 border">Mức lương</th>
              <th className="py-2 px-4 border">Hạn nộp</th>
              <th className="py-2 px-4 border">Hình ảnh</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {jobs.map((job) => (
              <tr key={job._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 border">{job.title}</td>
                <td className="py-3 px-6 border">{job.description}</td>
                <td className="py-3 px-6 border">{job.requirements}</td>
                <td className="py-3 px-6 border">{formatMoney(job.salary)}</td>
                <td className="py-3 px-6 border">{`${formatDate(job.applicationDeadlineStart)} - ${formatDate(job.applicationDeadlineEnd)}`}</td>
                <td className="py-3 px-6 border">
                  {job.image && <img src={`http://localhost:3000/${job.image}`} alt="Job" className=" object-cover"/>}
                </td>
                <td className="py-3 px-6 border">
                  <button
                    onClick={() => {
                      setEditingJob(job);
                      populateFormData(job);
                      setIsModalOpen(true);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded "
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl mb-4">{editingJob ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="border p-2 mb-4 w-full"
                placeholder="Tiêu đề"
              />
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border p-2 mb-4 w-full"
                placeholder="Mô tả công việc"
              />
              <input
                type="text"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                className="border p-2 mb-4 w-full"
                placeholder="Yêu cầu công việc"
              />
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="border p-2 mb-4 w-full"
                placeholder="Mức lương"
              />
              <div className="flex justify-between mb-4">
                <input
                  type="date"
                  name="applicationDeadlineStart"
                  value={formData.applicationDeadlineStart}
                  onChange={handleChange}
                  className="border p-2 w-full mr-2"
                />
                <input
                  type="date"
                  name="applicationDeadlineEnd"
                  value={formData.applicationDeadlineEnd}
                  onChange={handleChange}
                  className="border p-2 w-full ml-2"
                />
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                className="border p-2 mb-4 w-full"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setEditingJob(null);
                    setIsModalOpen(false);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700 transition duration-300"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruitmentUpdate;
