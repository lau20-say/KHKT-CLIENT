import React from "react";
import img1 from "../../assets/Home/Logo.svg";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <div className="bg-slate-100 pt-44 pb-24">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-6 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4">
        {/* Logo và Mô Tả */}
        <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start">
          <img src={img1} alt="Simple Logo" className="h-24 w-auto mb-6" />
          <p className="mb-4">
            <strong className="font-medium">Simple</strong> là nền tảng học tập,
            nơi bạn có thể học tập mãi mãi.
          </p>
          <div className="flex w-full mt-2 mb-8 -mx-2">
            <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
              <FacebookIcon fontSize="small" color="primary" />
            </div>
            <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
              <InstagramIcon fontSize="small" color="primary" />
            </div>
          </div>
          <p className="text-gray-400">©{new Date().getFullYear()} - Simple</p>
        </div>

        {/* Học Tập */}
        <div className="row-span-2 sm:col-span-2 sm:col-start-7 sm:col-end-9 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">Học Tập</p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Tài Liệu
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Khóa Học
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Thư Viện
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Lịch Học
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Diễn Đàn
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Blog
            </li>
          </ul>
        </div>

        {/* Kết Nối Cộng Đồng */}
        <div className="row-span-2 sm:col-span-2 sm:col-start-9 sm:col-end-11 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">
            Kết Nối Cộng Đồng
          </p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Giới Thiệu
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              FAQ
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Hướng Dẫn
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Về Chúng Tôi
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Chính Sách Bảo Mật
            </li>
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Điều Khoản Sử Dụng
            </li>
          </ul>
        </div>

        {/* Trở thành giáo viên */}
        <div className="row-span-2 sm:col-span-2 sm:col-start-11 sm:col-end-13 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">
            Trở Thành Giáo Viên
          </p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-orange-500 cursor-pointer transition-all">
              Liên Hệ
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
