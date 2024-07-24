"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { recentOrders } from "../../../utils/constants/recentOrders";

const RevealCards = () => {
  return (
    <section className="p-8 ">
      <span className="block text-center text-3xl font-bold mb-4">
        Recent Orders
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {recentOrders.map((order, index) => (
          <Card
            key={index}
            title={order.title}
            description={order.description}
            imgSrc={order.imgSrc}
          />
        ))}
      </div>
    </section>
  );
};

const Card = ({
  imgSrc,
  title,
  description,
}: {
  imgSrc: string;
  title: string;
  description: string;
}) => {
  return (
    <motion.div whileHover="hover" className="w-full h-[300px] relative">
      <div className="h-1/2 p-6 flex flex-col justify-center bg-black">
        <h3 className="text-xl mb-2 font-semibold text-white">{title}</h3>
        <p className="text-sm font-light text-slate-300">{description}</p>
      </div>
      <motion.div
        initial={{
          top: "0%",
          right: "0%",
        }}
        variants={{
          hover: {
            top: "50%",
            right: "50%",
          },
        }}
        className="absolute inset-0 bg-slate-200 z-10"
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <a
        href="#"
        rel="nofollow"
        className="w-1/2 h-1/2 absolute bottom-0 right-0 z-0 grid place-content-center bg-white text-black hover:text-indigo-500 transition-colors"
      >
        <div className="flex items-center">
          <span className="text-xs"> READ MORE</span>
          <FiArrowUpRight className="text-lg" />
        </div>
      </a>
    </motion.div>
  );
};

export default RevealCards;
