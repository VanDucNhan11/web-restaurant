import React from 'react'
import '../recruitment/Recruitment.css'

const DetailRecruitment = () => {
  return (
    <div>
      <div className="relative">
          <img className="w-full h-full" src="https://madamelan.vn/storage/tuyen-dung/tuyendung-pc-min.jpg" alt="" />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center text-4xl md:text-6xl  title-font">Tuyển dụng</h1>
          <div className="absolute mt-10 top-1/2 left-1/2 transform -translate-x-1/2 flex items-center text-white text-lg md:flex-row md:text-2xl font-light">
              <a href="/"  className="mb-2 md:mb-0 md:mr-2">Trang chủ</a>
              <span className="md:mx-2">/</span>
              <span className="mb-2 md:mb-0 md:mr-2 ">Tuyển dụng</span>
          </div>
      </div>
      <div className=" mx-auto  items-center justify-center md:w-3/4 pb-10 pt-10">
        <div className=" flex justify-items-center gap-y-10 sm:grid-cols-2 lg:grid-cols-2 ">
            <div className="col-md-8 w-4/5">
                <div class="flex items-center space-x-3 ">
                    <span class="date-view font-light mr-2 flex items-center">
                        <i class="fal"><ion-icon name="person-outline"></ion-icon></i>
                        <span class="ml-1">Super Admin</span>
                    </span>
                    |
                    <span class="date-view font-light flex items-center ">
                        <i class="fal"><ion-icon name="time-outline"></ion-icon></i>
                        <span class="ml-1 mr-2">Hạn nộp hồ sơ: từ ngày 15/05/2024 - 01/07/2024</span>
                    </span>
                    |
                    <span class="date-view font-light mx-2 flex items-center">
                          <i className="fa fa-bookmark primary-color">
                              <ion-icon name="bookmark-outline"></ion-icon>
                          </i>  
                          <span class="ml-1 font-bold">Toàn thời gian</span>
                    </span>
                </div>
                <div className="pb-4">
                    <div className="title-font td mt-10 ">Nhân viên phục vụ</div>
                    <div>
                        <div className="text-2xl title-font pt-4 pb-3">Mô tả công việc</div>
                        <div className="font-light font-size-contnet content-color ">
                            <p style={{ textAlign: "left", alignItems: "left" }}>- Thực hiện quy trình phục vụ chuẩn của nhà hàng</p>
                            <p style={{ textAlign: "left", alignItems: "left" }}>- Lấy order từ khách hàng</p>
                            <p style={{ textAlign: "left", alignItems: "left" }}>- Giới thiệu món ăn và đồ uống theo yêu cầu của khách hàng</p>
                            <p style={{ textAlign: "left", alignItems: "left" }}>- Kiểm tra các món ăn trước khi phục vụ khách</p>
                            <p style={{ textAlign: "left", alignItems: "left" }}>- Chăm sóc khách hàng trong quá trình phục vụ</p>
                            <p style={{ textAlign: "left", alignItems: "left" }}>- Dọn dẹp bàn ăn và thay đồ mới cho khách</p>
                            <p style={{ textAlign: "left", alignItems: "left" }}>- Giữ gìn vệ sinh và bảo quản CCDC làm việc sạch sẽ</p>
                            <p style={{ textAlign: "left", alignItems: "left" }}>- Thực hiện các công việc phát sinh khác theo yêu cầu của cấp trên</p>
                            <p align="left">- Thời gian làm việc theo ca xoay (6h-14h or 14h-22h)</p>
                            <p align="left">- Số lượng: 07 vị trí</p>
                            <p>&nbsp;</p>
                        </div>
                        <div className="text-2xl title-font pt-4 pb-3">Yêu cầu công việc</div>
                        <div className="font-light font-size-contnet content-color ">
                            <p style={{ textAlign: "left", alignItems: "left" }}>- Nam/Nữ từ 18 trở lên</p>
                            <p style={{ textAlign: "left", alignItems: "left" }}>- Tốt nghiệp THPT trở lên, ưu tiên ứng viên có kinh nghiệm làm việc tại các Nhà hàng</p>
                            <p style={{ textAlign: "left", alignItems: "left" }}>- Niềm nở, thân thiện, nhiệt tình, hòa đồng</p>
                            <p style={{ textAlign: "left", alignItems: "left" }}>- Trung thực, có ý thức, có tinh thần trách nhiệm</p>
                            <p style={{ textAlign: "left", alignItems: "left" }}>- Có khả năng giao tiếp và yêu thích công việc phục vụ nhà hàng</p>
                            <p style={{ textAlign: "left", alignItems: "left" }}>- Kỹ năng giao tiếp và xử lý vấn đề</p>
                            <p style={{ textAlign: "left", alignItems: "left" }}>- Có định hướng làm việc lâu dài với nhà hàng</p>
                            <p style={{ textAlign: "left", alignItems: "left" }}>- Thu nhập: 5.000.000đ/ tháng, thử việc 1 tháng hưởng 80%.</p>
                            <p>&nbsp;</p>
                        </div>
                        <div className="text-2xl title-font pt-4 pb-3">Quyền lợi được hưởng</div>
                        <div className="font-light font-size-contnet content-color ">
                            <p>- Được đào tào tạo thêm để nâng cao chuyên môn nghiệp vụ</p>
                            <p>- Môi trường làm việc năng động, thân thiện, cơ hội thăng tiến</p>
                            <p>- Đầy đủ các chế độ dành cho người lao động theo như quy định của Công ty và pháp luật hiện hành (BHXH, BHYT, BHTN…)</p>
                            <p>- Phụ cấp cơm ca tại nhà hàng</p>
                            <p>- Ngày công làm việc: 26 công/tháng, tuần off 1 ngày</p>
                            <p>&nbsp;</p>
                        </div>
                        <div className="text-2xl title-font pt-4 pb-3">Liên hệ</div>
                        <div className="font-light font-size-contnet content-color ">
                            <p>Hồ sơ:</p>
                            <p>- Nộp CV&nbsp;</p>
                            <p>- Sơ yếu lí lịch có dán ảnh 4×6 (không quá 06 tháng)</p>
                            <p>- Bản sao giấy khai sinh, các văn bằng, chứng chỉ.</p>
                            <p>- Giấy khám sức khỏe không quá 06 tháng.</p>
                            <p>- Chứng minh thư, hộ khẩu photo công chứng.</p>
                            <p>- Đơn xin việc.</p>
                            <p>&nbsp;</p>
                            <p>Liên hệ ứng tuyển:</p>
                            <p>- Gửi CV về Emai: fugidanang@gmail.com.&nbsp;</p>
                            <p>- Ghi rõ tiêu đề: Ứng tuyển vị trí – Họ và tên ứng viên</p>
                            <p>- Liên hệ SĐT: (0236)3.616.228 | 0766.699.639 (Ms Lê)</p>
                            <p>- Gửi hồ sơ trực tiếp về địa chỉ: 04 Bạch Đằng. P, Thạch Thang, Quận Hải Châu, TP.ĐN</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" col-md-4 archive w-2/5 list-other-job">
                <h2 className="title-font text-green-800 text-3xl "> Tuyển dụng ví trí khác</h2>
                <div className="flex flex-warp">
                    <div className="col-md-12">
                        <a href="">
                            <img src="https://madamelan.vn/storage/220511-mdl-web-tuyen-dung-nv-pha-che.jpg" alt="" />
                            <div className="text-2xl title-font pt-3">Nhân viên pha chế</div>
                        </a>
                    </div>
                </div>
                <div className="flex flex-warp">
                    <div className="col-md-12">
                        <a href="">
                            <img src="https://madamelan.vn/storage/220617-mdl-web-tuyen-dung-nv-thu-kho.jpg" alt="" />
                            <div className="text-2xl title-font pt-3">Nhân viên thủ kho</div>
                        </a>
                    </div>
                </div>
                <div className="flex flex-warp">
                    <div className="col-md-12">
                        <a href="">
                            <img src="https://madamelan.vn/storage/220617-mdl-web-tuyen-dung-nv-so-che-nguyen-lieu.jpg" alt="" />
                            <div className="text-2xl title-font pt-3">Nhân viên sơ chế nguyên liệu</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default DetailRecruitment
