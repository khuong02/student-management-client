import React from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const params = useParams()["*"];

  return <div>{params}</div>;
};

export default UserProfile;
