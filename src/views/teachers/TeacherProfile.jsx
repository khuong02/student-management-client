import React from "react";
import { useParams } from "react-router-dom";

const TeacherProfile = () => {
  const params = useParams()["*"];

  return <div>{params}</div>;
};

export default TeacherProfile;