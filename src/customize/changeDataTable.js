import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { formatYear } from "../moment/formatYear";

import {
  createDataClass,
  createDataTeacher,
  createDataSubject,
} from "../components/CreateData";

const useChangeDataTable = ({ isOpen }) => {
  const [data, setData] = useState([]);
  const { classes } = useSelector((state) => state.classes);
  const { teachersList } = useSelector((state) => state.teacher);
  const { subject } = useSelector((state) => state.subject);
  //   const { assignmentList } = useSelector((state) => state.assignment);

  useEffect(() => {
    switch (isOpen) {
      case 0:
        return (
          classes &&
          setData([
            ...classes.map((item) => {
              return createDataClass(
                item.classCode,
                item.className,
                item.nameMajor,
                item.year ? formatYear(item.year) : new Date().getFullYear(),
                item.majorCode
              );
            }),
          ])
        );
      case 1:
        return (
          teachersList &&
          setData([
            ...teachersList.map((item) => {
              return createDataTeacher(
                item.teacherCode,
                item.name,
                item.nameMajor,
                formatYear(item.year),
                item.uuid,
                item.majorCode
              );
            }),
          ])
        );
      case 2:
        return (
          subject &&
          setData([
            ...subject.map((item) => {
              return createDataSubject(
                item.subjectCode,
                item.nameSubject,
                item.nameMajor,
                item.typeSubject,
                item.majorCode
              );
            }),
          ])
        );

      default:
        return setData([]);
    }
  }, [isOpen, classes, teachersList, subject]);

  return data;
};

export default useChangeDataTable;
