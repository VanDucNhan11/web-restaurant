import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../recruitment/Recruitment.css';

const DetailRecruitment = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/recruitments/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="relative">
        <img className="w-full h-full" src="https://madamelan.vn/storage/tuyen-dung/tuyendung-pc-min.jpg" alt="Recruitment" />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center text-4xl md:text-6xl title-font">Tuyển dụng</h1>
        <div className="absolute mt-10 top-1/2 left-1/2 transform -translate-x-1/2 flex items-center text-white text-lg md:flex-row md:text-2xl font-light">
          <a href="/" className="mb-2 md:mb-0 md:mr-2">Trang chủ</a>
          <span className="md:mx-2">/</span>
          <span className="mb-2 md:mb-0 md:mr-2 ">Chi tiết tuyển dụng</span>
        </div>
      </div>
      <div className="mx-auto items-center justify-center md:w-3/4 pb-10 pt-10">
        <div className="flex justify-items-center gap-y-10 sm:grid-cols-2 lg:grid-cols-2">
          <div className="col-md-8 w-4/5">
            <div className="flex items-center space-x-3">
              <span className="date-view font-light mr-2 flex items-center">
                <i className="fal"><ion-icon name="person-outline"></ion-icon></i>
                <span className="ml-1">Super Admin</span>
              </span>
              |
              <span className="date-view font-light flex items-center">
                <i className="fal"><ion-icon name="time-outline"></ion-icon></i>
                <span className="ml-1 mr-2">Hạn nộp hồ sơ: từ ngày {new Date(job.applicationDeadlineStart).toLocaleDateString()} - {new Date(job.applicationDeadlineEnd).toLocaleDateString()}</span>
              </span>
              |
              <span className="date-view font-light mx-2 flex items-center">
                <i className="fa fa-bookmark primary-color">
                  <ion-icon name="bookmark-outline"></ion-icon>
                </i>
                <span className="ml-1 font-bold">Toàn thời gian</span>
              </span>
            </div>
            <div className="pb-4">
              <div className="title-font td mt-10">{job.title}</div>
              <div>
                <div className="text-2xl title-font pt-4 pb-3">Mô tả công việc</div>
                <div className="font-light font-size-contnet content-color">
                    {job.description.split('-').map((desc, index) => (
                    <p key={index}>{index > 0 && ' - '}{desc.trim()}</p>
                    ))}
                </div>
                <div className="text-2xl title-font pt-4 pb-3">Yêu cầu công việc</div>
                <div className="font-light font-size-contnet content-color">
                    {job.requirements.split('-').map((req, index) => (
                    <p key={index}>{index > 0 && ' - '}{req.trim()}</p>
                    ))}
                </div>
                <div className="text-2xl title-font pt-4 pb-3">Quyền lợi được hưởng</div>
                <div className="font-light font-size-contnet content-color">
                  <p>- Được đào tạo thêm để nâng cao chuyên môn nghiệp vụ</p>
                  <p>- Môi trường làm việc năng động, thân thiện, cơ hội thăng tiến</p>
                  <p>- Đầy đủ các chế độ dành cho người lao động theo như quy định của Công ty và pháp luật hiện hành (BHXH, BHYT, BHTN…)</p>
                  <p>- Phụ cấp cơm ca tại nhà hàng</p>
                  <p>- Ngày công làm việc: 26 công/tháng, tuần off 1 ngày</p>
                  <p>&nbsp;</p>
                </div>
                <div className="text-2xl title-font pt-4 pb-3">Liên hệ</div>
                <div className="font-light font-size-contnet content-color">
                  <p>Hồ sơ:</p>
                  <p>- Nộp CV&nbsp;</p>
                  <p>- Sơ yếu lí lịch có dán ảnh 4×6 (không quá 06 tháng)</p>
                  <p>- Bản sao giấy khai sinh, các văn bằng, chứng chỉ.</p>
                  <p>- Giấy khám sức khỏe không quá 06 tháng.</p>
                  <p>- Chứng minh thư, hộ khẩu photo công chứng.</p>
                  <p>- Đơn xin việc.</p>
                  <p>&nbsp;</p>
                  <p>Liên hệ ứng tuyển:</p>
                  <p>- Gửi CV về Email: fugidanang@gmail.com.&nbsp;</p>
                  <p>- Ghi rõ tiêu đề: Ứng tuyển vị trí – Họ và tên ứng viên</p>
                  <p>- Liên hệ SĐT: (0236)3.616.228 | 0766.699.639 (Ms Lê)</p>
                  <p>- Gửi hồ sơ trực tiếp về địa chỉ: 04 Bạch Đằng. P, Thạch Thang, Quận Hải Châu, TP.ĐN</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 archive w-2/5 list-other-job">
            <h2 className="title-font text-green-800 text-3xl">Tuyển dụng vị trí khác</h2>
            {job.otherPositions && job.otherPositions.length > 0 ? (
              job.otherPositions.map((otherJob) => (
                <div key={otherJob._id} className="flex flex-wrap">
                  <div className="col-md-12">
                    <a href={`/recruitment/${otherJob._id}`}>
                      <img src={`http://localhost:3000/${otherJob.image}`} alt={otherJob.title} />
                      <div className="text-2xl title-font pt-3">{otherJob.title}</div>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>Không có vị trí tuyển dụng khác.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailRecruitment;
