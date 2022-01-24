import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import methodApi from "../../api/methodApi";

import { Box, Typography, Card, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import { updateSubject, subjectPending } from "../../features/subject/subject";
import Loading from "../../layout/Loading";
import AnimationChangePage from "../../layout/AnimationChangePage";

const SubjectProfile = () => {
  const params = useParams()["subjectId"];
  const { enqueueSnackbar } = useSnackbar();
  const { subjects, loading } = useSelector((state) => state.subjects);
  const subject = subjects?.find((obj) => obj.subjectCode === params);
  const dispatch = useDispatch();

  const { majors } = useSelector((state) => state.majors);

  const [infoSubject, setInfoSubject] = useState(subject);
  const [selectChange, setSelectChange] = useState(true);

  useEffect(() => {
    if (!subject || !infoSubject) return;
    if (
      infoSubject.nameSubject !== subject.nameSubject ||
      infoSubject.typeSubject !== subject.typeSubject ||
      infoSubject.majorCode !== subject.majorCode
    ) {
      return setSelectChange(false);
    }
    return setSelectChange(true);
  }, [infoSubject, subject]);

  useEffect(() => {
    setInfoSubject(subject);
  }, [subject]);

  if (!subject || !infoSubject)
    return (
      <Typography variant="h2" fontWeight="bold">
        Not Found This Subject.
      </Typography>
    );

  const { nameSubject, typeSubject, majorCode } = infoSubject;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInfoSubject({ ...infoSubject, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(subjectPending);
      const optionUpdate = { nameSubject, typeSubject, majorCode };
      const res = await methodApi.update(
        `/api/subjects/update_subject/${params}`,
        optionUpdate
      );

      if (res.status === 400 || res.status === 500) {
        enqueueSnackbar(res.data.msg, { variant: "error" });
      }

      dispatch(updateSubject({ ...optionUpdate, subjectCode: params }));

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
                Edit Subject
              </Typography>
            </Box>
            <Box>
              <Card sx={{ padding: 3, flexWrap: "wrap" }} variant="outlined">
                <TextField
                  id="outlined-basic"
                  label="Name Subject"
                  variant="outlined"
                  sx={{ width: "46.5%", margin: 3 }}
                  value={nameSubject}
                  name="nameSubject"
                  onChange={handleChangeInput}
                />
                <FormControl sx={{ width: "46.5%", margin: 3 }}>
                  <InputLabel id="demo-simple-select-label">
                    Major Code
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={majorCode}
                    name="majorCode"
                    label="Major Code"
                    onChange={handleChangeInput}
                  >
                    {majors?.map((item) => {
                      return (
                        <MenuItem key={item.majorCode} value={item.majorCode}>
                          {item.majorCode}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "46.5%", margin: 3 }}>
                  <InputLabel id="demo-simple-select-label">
                    Type Subject
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={typeSubject}
                    label="Type Subject"
                    name="typeSubject"
                    onChange={handleChangeInput}
                  >
                    <MenuItem value={"LT"}>LT</MenuItem>
                    <MenuItem value={"TH"}>TH</MenuItem>
                  </Select>
                </FormControl>
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

export default SubjectProfile;
