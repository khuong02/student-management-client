import React, { useRef } from "react";

import { motion, useCycle } from "framer-motion";

import Button from "@mui/material/Button";

import { useDimensions } from "./useDimensions";
import FormCreateClass from "./FormCreateClass";

const sidebar = {
  open: () => ({
    // clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    width: "100%",
    height: "100%",
    transition: {
      //   type: "spring",
      stiffness: 40,
      restDelta: 2,
    },
  }),
  closed: {
    // clipPath: "circle(30px at 40px 40px)",
    width: "150px",
    height: "50px",
    transition: {
      //   delay: 0.5,
      //   type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const ButtonCreateClasses = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div
        className={isOpen ? "box-create-class open" : "box-create-class closed"}
        variants={sidebar}
        onClick={() => toggleOpen()}
      >
        {!isOpen && <Button variant="contained">create class</Button>}
      </motion.div>
      {isOpen && <FormCreateClass toggle={() => toggleOpen()} />}
    </motion.div>
  );
};

export default ButtonCreateClasses;
