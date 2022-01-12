import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import {
  createDataClass,
  createDataTeacher,
  createDataSubject,
} from "../components/CreateData";

const useChangeDataTable = ({ isOpen }) => {
  const [data, setData] = useState([]);
  const { classes } = useSelector((state) => state.classes);
  const { major } = useSelector((state) => state.major);
  const { teachersList } = useSelector((state) => state.teacher);
  const { subject } = useSelector((state) => state.subject);

  useEffect(() => {
    if (!major) return;
    switch (isOpen) {
      case 0:
        return (
          classes &&
          setData([
            ...classes.map((item) => {
              const nameMajor = major.find(
                (obj) => obj.majorCode === item.majorCode
              ).nameMajor;
              return createDataClass(
                item.classCode,
                item.className,
                nameMajor,
                item.year ? item.year : new Date().getFullYear(),
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
              const nameMajor = major.find(
                (obj) => obj.majorCode === item.majorCode
              ).nameMajor;
              return createDataTeacher(
                item.teacherCode,
                item.name,
                nameMajor,
                item.year,
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
              const nameMajor = major.find(
                (obj) => obj.majorCode === item.majorCode
              ).nameMajor;
              return createDataSubject(
                item.subjectCode,
                item.nameSubject,
                nameMajor,
                item.typeSubject,
                item.majorCode
              );
            }),
          ])
        );

      default:
        return setData([]);
    }
  }, [isOpen, classes, major, teachersList, subject]);

  return data;
};

export default useChangeDataTable;
