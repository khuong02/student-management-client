import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const SubjectProfile = () => {
  const params = useParams()["*"];
  const navigation = useNavigate();

  const throwBack = () => {
    navigation("/subjects");
  };

  return (
    <div>
      {params}
      <button onClick={throwBack}>click me!</button>
    </div>
  );
};

export default SubjectProfile;
