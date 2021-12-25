import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const useFetchData = ({ funcAction }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [currentResult, setCurrentResult] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        if (
          !currentUser.roles ||
          currentUser.roles.toUpperCase() ===
            process.env.REACT_APP_ROLES_STUDENT
        )
          return;
        if (
          currentUser.roles.toUpperCase() === process.env.REACT_APP_ROLES_ADMIN
        ) {
          const teacherListAction = await dispatch(funcAction());
          setCurrentResult(unwrapResult(teacherListAction));
        }
      } catch (err) {
        console.log(err.response);
      }
    };

    getData();
  }, [dispatch, currentUser, funcAction]);

  return currentResult;
};

export default useFetchData;
