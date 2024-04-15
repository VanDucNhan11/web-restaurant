// code  vaoo day

import React from 'react'
import  './Reservations.css'

const Reservations = () => {
  return (
    <div className='datban'>
        <h1 className="text-4xl text-center  text-white">Đặt lịch trực tuyến</h1>
        <h3 className="text-center italic text-white">Trang chủ/đặt chỗ</h3>
        <div className="w-72 h-24 bg-cover bg-no-repeat bg-center flex mt-20 content-center ml-72">
          <div className=" px-5 pt-5 pd-center bg-white rounded-xl border-2  ml-6">
            <div className="label">Họ và tên</div>
            <input type="text" className="form-control ng-pristine ng-untouched ng-empty ng-invalid-required w-64" placeholder="họ và tên" name="full_name" required/>
          </div>
          <div className=" px-5 pt-5 pd-center bg-white rounded-xl border-2 ml-6 ">
            <div className="label">Email</div>
            <input type="text" className="form-control ng-pristine ng-untouched ng-empty ng-invalid-required w-64" placeholder="Email"  required/>
          </div>
          <div className=" px-5 pt-5 pd-center bg-white rounded-xl border-2 ml-6 ">
            <div className="label">Số điện thoại</div>
            <input type="text" className="form-control ng-pristine ng-untouched ng-empty ng-invalid-required w-64" placeholder="số điện thoại" required/>
          </div>
        </div>
        <div className="w-72 h-24 bg-cover bg-no-repeat bg-center flex mt-5 content-center ml-72">
          <div className=" px-5 pt-5 pd-center bg-white rounded-xl border-2  ml-6">
            <div className="label">Ngày</div>
            <input type="date" className="form-control ng-pristine ng-valid ng-isolate-scope ng-not-empty ng-valid-date ng-touched w-64"  name="date" uib-datepicker-popup="dd-MM-yyyy" ng-lick="open($event, date)" is-open="open[date]"
            datepiker-options="dateOptions" placeholder="dd-MM-yyyy" close-text="Close"/>
          </div>
          <div className=" px-5 pt-5 pd-center bg-white rounded-xl border-2 ml-6 ">
            <div className="label">Thời gian</div>
            <input type="time" className="form-control ng-pristine ng-untouched ng-empty ng-invalid-required w-64" placeholder="Email"  required/>
          </div>
          <div className=" px-5 pt-5 pd-center bg-white rounded-xl border-2 ml-6 ">
            <div className="label">Số người</div>
            <input type="text" className="form-control ng-pristine ng-untouched ng-empty ng-invalid-required w-64" placeholder="số điện thoại" required/>
          </div>
        </div>
        <div className="yeucau px-5 pt-5 origin-center bg-white rounded-xl border-2  mt-5">
            <div className="label">Yêu cầu đặt biệt</div>
            <textarea class="form-control ng-pristine ng-valid ng-empty ng-touched" id="" cols="92" rows="4" name="content" ng-model="formItem.content"></textarea>
        </div>
        <button className='clickdone'>Hoàn Thành</button>
    </div>
  )
}

export default Reservations
