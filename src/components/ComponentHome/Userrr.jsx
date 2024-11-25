import ScrollAnimationWrapper from "../LayOutHome/ScrollAnimationWrapper";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const User = () => {
  return (
    <ScrollAnimationWrapper>
      <motion.div
        className="w-full mx-auto h-max p-10 flex flex-wrap justify-evenly gap-x-4 items-center"
        initial="hidden"
        id="card"
        animate="visible"
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.div
          className="w-full sm:w-[30%] h-[410px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          variants={cardVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="items-center pb-10 px-2 h-full flex flex-col justify-evenly py-4">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="https://sohanews.sohacdn.com/160588918557773824/2022/1/16/albert-einstein-5-16423329349941331671172.jpg"
              alt="Albert Einstein"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Albert Einstein
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Nhà vật lý lý thuyết
            </span>
            <p className="px-4 font-semibold font-sans text-sm pt-4 text-center">
              "Cuộc sống giống như việc lái xe đạp. Để giữ thăng bằng, bạn phải
              tiếp tục di chuyển."
            </p>
          </div>
        </motion.div>

        <motion.div
          className="w-full sm:w-[30%] h-[410px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          variants={cardVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="items-center pb-10 px-2 h-full flex flex-col justify-evenly py-4">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="https://ap-pics2.gotpoem.com/ap-pics/user/4918/435big.jpg?178x190"
              alt="Henri Frederic Amiel"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Henri Frederic Amiel
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Nhà triết học
            </span>
            <p className="px-4 font-semibold font-sans text-sm pt-4 text-center">
              "Học cách... là chính bạn, và học cách từ bỏ mọi thứ một cách tốt
              đẹp..."
            </p>
          </div>
        </motion.div>

        <motion.div
          className="w-full sm:w-[30%] h-[410px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          variants={cardVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="items-center pb-10 px-2 h-full flex flex-col justify-evenly">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="https://sidoni.net/uploads/bachtoan/2022/thang8/30/brian-tracy-la-mot-dien-gia-truyen-cam-hung-trong-kinh-doanh.JPG"
              alt="Brian Tracy"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Brian Tracy
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Tác giả
            </span>
            <p className="px-4 font-semibold font-sans text-sm pt-4 text-center">
              "Không ai sống đủ lâu để học mọi thứ từ đầu..."
            </p>
          </div>
        </motion.div>
      </motion.div>
    </ScrollAnimationWrapper>
  );
};

export default User;
