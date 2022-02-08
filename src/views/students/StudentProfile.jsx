import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatDefaultPropsInput } from "../../moment/formatDefaultPropsInput";

import { useSnackbar } from "notistack";

import methodApi from "../../api/methodApi";

import { Box, Typography, Card, TextField } from "@mui/material";
import Button from "@mui/material/Button";

import {
  updateStudent,
  getDataPending,
} from "../../features/dataListStudentAndTeacher/student";
import Loading from "../../layout/Loading";
import AnimationChangePage from "../../layout/AnimationChangePage";

const StudentProfile = () => {
  const params = useParams()["studentId"];
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { studentsList, loading } = useSelector((state) => state.students);

  const student = studentsList?.find((student) => student.uuid === params);

  const [infoStudent, setInfoStudent] = useState(student);
  const [selectChange, setSelectChange] = useState(true);

  useEffect(() => {
    if (!student || !infoStudent) return;
    if (
      infoStudent.name !== student.name ||
      formatDefaultPropsInput(infoStudent.birthday) !==
        formatDefaultPropsInput(student.birthday)
    ) {
      return setSelectChange(false);
    } else {
      return setSelectChange(true);
    }
  }, [infoStudent, student]);

  useEffect(() => {
    setInfoStudent(student);
  }, [student]);

  if (!student || !infoStudent) {
    return (
      <Typography variant="h2" fontWeight="bold">
        Not Found This student.
      </Typography>
    );
  }

  const { name, birthday, nameMajor, studentCode } = infoStudent;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInfoStudent({ ...infoStudent, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(getDataPending());
      const optionUpdate = { name, birthday };

      const res = await methodApi.update(
        `/api/user/update_student/${params}`,
        optionUpdate
      );

      if (res.status === 400 || res.status === 500) {
        enqueueSnackbar(res.data.msg, { variant: "error" });
      }

      dispatch(updateStudent({ ...optionUpdate, uuid: params }));

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
                Edit student
              </Typography>
            </Box>
            <Box>
              <Card sx={{ padding: 3, flexWrap: "wrap" }} variant="outlined">
                <TextField
                  id="outlined-basic"
                  label="Student Code"
                  variant="outlined"
                  sx={{ width: "46.5%", margin: 3 }}
                  defaultValue={studentCode}
                  disabled
                />
                <TextField
                  id="outlined-basic"
                  label="Name Student"
                  variant="outlined"
                  sx={{ width: "46.5%", margin: 3 }}
                  value={name}
                  name="name"
                  onChange={handleChangeInput}
                />
                <TextField
                  id="outlined-basic"
                  label="Birthday"
                  variant="outlined"
                  sx={{ width: "46.5%", margin: 3 }}
                  value={formatDefaultPropsInput(birthday)}
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

export default StudentProfile;
