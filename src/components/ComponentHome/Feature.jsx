import React, { useContext, useMemo } from "react";
import { motion } from "framer-motion";
import getScrollAnimation from "./getScrollAnimation";
import ScrollAnimationWrapper from "../LayOutHome/ScrollAnimationWrapper";
import img1 from "../../assets/Home/Illustration2.png";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Feature = () => {
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
    <div
      className="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="feature"
    >
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 p-8 my-12">
        {/* Hình minh họa */}
        <ScrollAnimationWrapper className="flex w-full justify-end">
          <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
            <img src={img1} className="w-full h-auto" />
          </motion.div>
        </ScrollAnimationWrapper>

        {/* Nội dung tính năng */}
        <ScrollAnimationWrapper>
          <motion.div
            className="flex flex-col items-end justify-center  mt-24 ml-auto w-full lg:w-9/12"
            variants={scrollAnimation}
          >
            <h3 className="text-4xl lg:text-4xl font-semibold  leading-relaxed text-black-600">
              Nhiều tính năng đã được tích hợp
            </h3>
            <p className="my-2 text-black-500">
              Hãy cùng nhau khám phá những tính năng mới nhé!!!
            </p>
            <button
              className="bg-blue-400 px-4 py-2 mt-10 text-white font-semibold
            font-mono rounded-xl text-xl w-full"
              onClick={() => {
                start();
              }}
            >
              {" "}
              Bắt đầu ngay!!
            </button>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
};

export default Feature;
