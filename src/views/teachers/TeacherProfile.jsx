import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatDefaultPropsInput } from "../../moment/formatDefaultPropsInput";

import { useSnackbar } from "notistack";

import methodApi from "../../api/methodApi";

import { Box, Typography, Card, TextField } from "@mui/material";
import Button from "@mui/material/Button";

import {
  updateTeacher,
  teachersListPending,
} from "../../features/dataListStudentAndTeacher/teacher";
import Loading from "../../layout/Loading";
import AnimationChangePage from "../../layout/AnimationChangePage";

const TeacherProfile = () => {
  const params = useParams()["teacherId"];
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { teachersList, loading } = useSelector((state) => state.teachers);

  const teacher = teachersList?.find((teacher) => teacher.uuid === params);

  const [infoTeacher, setInfoTeacher] = useState(teacher);
  const [selectChange, setSelectChange] = useState(true);

  useEffect(() => {
    if (!teacher || !infoTeacher) return;
    if (
      infoTeacher.name !== teacher.name ||
      formatDefaultPropsInput(infoTeacher.birthday) !==
        formatDefaultPropsInput(teacher.birthday)
    ) {
      return setSelectChange(false);
    } else {
      return setSelectChange(true);
    }
  }, [infoTeacher, teacher]);

  useEffect(() => {
    setInfoTeacher(teacher);
  }, [teacher]);

  if (!teacher || !infoTeacher) {
    return (
      <Typography variant="h2" fontWeight="bold">
        Not Found This Teacher.
      </Typography>
    );
  }

  const { name, birthday, nameMajor, teacherCode } = infoTeacher;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInfoTeacher({ ...infoTeacher, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(teachersListPending);
      const optionUpdate = { name, birthday };

      const res = await methodApi.update(
        `/api/user/update_teacher/${params}`,
        optionUpdate
      );

      console.log(res);

      if (res.status === 400 || res.status === 500) {
        enqueueSnackbar(res.data.msg, { variant: "error" });
      }

      dispatch(updateTeacher({ ...optionUpdate, uuid: params }));

      enqueueSnackbar(res.msg, { variant: "success" });
    } catch (err) {
      err.response && console.log(err.response);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <AnimationChangePage>
          <Box padding={3}>
            <Box>
              <Typography variant="h2" fontWeight="bold">
                Edit Teacher
              </Typography>
            </Box>
            <Box>
              <Card sx={{ padding: 3, flexWrap: "wrap" }} variant="outlined">
                <TextField
                  id="outlined-basic"
                  label="Teacher Code"
                  variant="outlined"
                  sx={{ width: "46.5%", margin: 3 }}
                  defaultValue={teacherCode}
                  disabled
                />
                <TextField
                  id="outlined-basic"
                  label="Name Teacher"
                  variant="outlined"
                  sx={{ width: "46.5%", margin: 3 }}
                  value={name}
                  name="name"
                  // defaultValue={name}
                  onChange={handleChangeInput}
                />
                <TextField
                  id="outlined-basic"
                  label="Birthday"
                  variant="outlined"
                  sx={{ width: "46.5%", margin: 3 }}
                  value={formatDefaultPropsInput(birthday)}
                  // defaultValue={formatDefaultPropsInput(birthday)}
                  name="birthday"
                  onChange={handleChangeInput}
                  type="date"
                />
                <TextField
                  id="outlined-basic"
                  label="Name Major"
                  variant="outlined"
                  sx={{ width: "46.5%", margin: 3 }}
                  defaultValue={nameMajor}
                  disabled
                />
                <Box sx={{ marginInline: 3 }}>
                  <Button
                    variant="contained"
                    sx={{ paddingInline: 4, paddingBlock: 1.8, fontSize: 16 }}
                    onClick={handleSubmit}
                    disabled={selectChange}
                  >
                    Submit
                  </Button>
                </Box>
              </Card>
            </Box>
          </Box>
        </AnimationChangePage>
      )}
    </>
  );
};

export default TeacherProfile;
