import React, { useContext, useMemo } from "react";
import { motion } from "framer-motion";
import getScrollAnimation from "./getScrollAnimation";
import ButtonPrimary from "./ButtonPrimary";
import ScrollAnimationWrapper from "../LayOutHome/ScrollAnimationWrapper";
import img1 from "../../assets/Home/Illustration1.png";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Hero = ({
  listUser = [
    {
      name: "Người dùng",
      number: "390",
      icon: <PersonIcon />, // Dùng trực tiếp component icon
    },
    {
      name: "Số tỉnh có người dùng",
      number: "20",
      icon: <LocationOnIcon />,
    },
    {
      name: "Số phòng học",
      number: "50",
      icon: <MeetingRoomIcon />,
    },
  ],
}) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const start = () => {
    if (!state.login) {
      navigate("/sign-in");
    } else {
      navigate("/list-room");
    }
  };

  return (
    <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto" id="about">
      <ScrollAnimationWrapper>
        <motion.div
          className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
          variants={scrollAnimation}
        >
          {/* Nội dung bên trái */}
          <div className="flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black text-black-600 leading-normal font-mono">
              Học cùng nhau và làm bài tập cùng nhau tại Simple
            </h1>
            <p className="text-black-500 mt-4 mb-6">Học thật là dễ!!!</p>
            <span
              onClick={() => {
                start();
              }}
            >
              <ButtonPrimary>Bắt đầu ngay!!</ButtonPrimary>
            </span>
          </div>

          {/* Hình minh họa */}
          <div className="flex w-full">
            <motion.div className="h-full w-full" variants={scrollAnimation}>
              <img
                src={img1}
                alt="VPN Illustration"
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>

      {/* Phần danh sách người dùng */}
      <div className="relative w-full flex">
        <ScrollAnimationWrapper className="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white-500 z-10">
          {listUser.map((listUsers, index) => (
            <motion.div
              className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
              key={index}
              custom={{ duration: 2 + index }}
              variants={scrollAnimation}
            >
              <div className="flex mx-auto w-40 sm:w-auto">
                {/* Vòng tròn chứa icon */}
                <div className="flex items-center justify-center bg-blue-100 w-12 h-12 mr-6 rounded-full">
                  {/* Render icon trực tiếp từ listUsers.icon */}
                  <div className="text-blue-400 h-6 w-6">{listUsers.icon}</div>
                </div>
                <div className="flex flex-col">
                  <p className="text-xl text-black-600 font-bold">
                    {listUsers.number}+
                  </p>
                  <p className="text-lg text-black-500">{listUsers.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </ScrollAnimationWrapper>

        {/* Hiệu ứng mờ nền */}
        <div
          className="absolute bg-black-600 opacity-5 w-11/12 rounded-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
          style={{ filter: "blur(114px)" }}
        ></div>
      </div>
    </div>
  );
};

export default Hero;
