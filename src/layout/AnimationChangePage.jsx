import React from "react";
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../components/Animation";

const AnimationChangePage = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="in"
      exit="out"
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimationChangePage;
