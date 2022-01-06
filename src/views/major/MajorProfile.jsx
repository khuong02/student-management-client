import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const MajorProfile = () => {
  const params = useParams()["*"];
  const navigation = useNavigate();

  const throwBack = () => {
    navigation("/majors");
  };

  return (
    <div>
      {params}
      <button onClick={throwBack}>click me!</button>
    </div>
  );
};

export default MajorProfile;
