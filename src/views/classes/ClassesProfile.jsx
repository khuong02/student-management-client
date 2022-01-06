import React from "react";
import { useParams } from "react-router-dom";

const ClassesProfile = () => {
  const params = useParams()["classesId"];

  return <div>{params}</div>;
};

export default ClassesProfile;
