import React from "react";
import PropTypes from "prop-types";

import { motion, AnimatePresence } from "framer-motion";

import TableVirtualized from "../TableVirtualized";
import { columnsClass, columnsTeacher, columnsSubject } from "../CreateData";
import { pageVariants, pageTransition } from "../Animation";

const TableAssignmentRender = (props) => {
  const { isOpen, searchedData, handleChangeAssignmentData } = props;

  return (
    <motion.div style={{ width: "50%", height: "100%" }}>
      <AnimatePresence exitBeforeEnter initial={false}>
        {isOpen === "CLASS" && (
          <motion.div
            variants={pageVariants}
            transition={pageTransition}
            initial="initial"
            animate="in"
            exit="out"
            style={{ width: "100%", height: "100%" }}
            key={isOpen}
          >
            <TableVirtualized
              data={searchedData}
              handleChangeAssignmentData={handleChangeAssignmentData}
              name="class"
              columns={columnsClass}
            />
          </motion.div>
        )}
        {isOpen === "TEACHER" && (
          <motion.div
            variants={pageVariants}
            transition={pageTransition}
            initial="initial"
            animate="in"
            exit="out"
            style={{ width: "100%", height: "100%" }}
            key={isOpen}
          >
            <TableVirtualized
              data={searchedData}
              handleChangeAssignmentData={handleChangeAssignmentData}
              name="teacher"
              columns={columnsTeacher}
            />
          </motion.div>
        )}
        {isOpen === "SUBJECT" && (
          <motion.div
            variants={pageVariants}
            transition={pageTransition}
            initial="initial"
            animate="in"
            exit="out"
            style={{ width: "100%", height: "100%" }}
            key={isOpen}
          >
            <TableVirtualized
              data={searchedData}
              handleChangeAssignmentData={handleChangeAssignmentData}
              name="subject"
              columns={columnsSubject}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

TableAssignmentRender.propTypes = {
  isOpen: PropTypes.string,
  searchedData: PropTypes.array,
  handleChangeAssignmentData: PropTypes.func.isRequired,
};

TableAssignmentRender.defaultProps = {
  isOpen: "CLASS",
  searchedData: [],
  handleChangeAssignmentData: null,
};

export default TableAssignmentRender;
