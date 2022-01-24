import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import methodApi from "../../api/methodApi";

import { Box, Typography, Card, TextField } from "@mui/material";
import Button from "@mui/material/Button";

import { updateMajor, majorPending } from "../../features/major/major";
import Loading from "../../layout/Loading";
import AnimationChangePage from "../../layout/AnimationChangePage";

const MajorProfile = () => {
  const params = useParams()["majorsId"];
  const { enqueueSnackbar } = useSnackbar();
  const { majors, loading } = useSelector((state) => state.majors);
  const dispatch = useDispatch();

  const major = majors?.find((obj) => obj.uuid === params);
  // const navigation = useNavigate();

  const [infoMajor, setInfoMajor] = useState(major);
  const [selectChange, setSelectChange] = useState(true);
  const [errorInput, setErrorInput] = useState({
    quantity: false,
    benchmark: false,
  });

  useEffect(() => {
    if (!major || !infoMajor || errorInput.quantity || errorInput.benchmark)
      return;
    if (
      infoMajor.nameMajor !== major.nameMajor ||
      +infoMajor.quantity !== +major.quantity ||
      +infoMajor.benchmark !== +major.benchmark
    ) {
      return setSelectChange(false);
    }
    return setSelectChange(true);
  }, [infoMajor, major, errorInput]);

  useEffect(() => {
    setInfoMajor(major);
  }, [major]);

  if (!major || !infoMajor)
    return (
      <Typography variant="h2" fontWeight="bold">
        Not Found This Major.
      </Typography>
    );

  const { nameMajor, quantity, benchmark } = infoMajor;

  // const throwBack = () => {
  //   navigation("/subjects");

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    const regex = /^([0-9]+)$/;
    if (!regex.test(value)) {
      setErrorInput({ ...errorInput, [name]: true });
    } else {
      setErrorInput({ ...errorInput, [name]: false });
    }
    setInfoMajor({ ...infoMajor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(majorPending);
      const optionUpdate = {
        nameMajor,
        quantity: +quantity,
        benchmark: +benchmark,
      };
      const res = await methodApi.update(
        `/api/majors/update_major/${params}`,
        optionUpdate
      );

      if (res.status === 400 || res.status === 500) {
        enqueueSnackbar(res.data.msg, { variant: "error" });
        return;
      }

      dispatch(updateMajor({ ...optionUpdate, subjectCode: params }));

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
                Edit Major
              </Typography>
            </Box>
            <Box>
              <Card sx={{ padding: 3, flexWrap: "wrap" }} variant="outlined">
                <TextField
                  id="outlined-basic"
                  label="Name Major"
                  variant="outlined"
                  sx={{ width: "46.5%", margin: 3 }}
                  value={nameMajor}
                  name="nameMajor"
                  onChange={handleChangeInput}
                />
                <TextField
                  error={errorInput.quantity}
                  id="outlined-basic"
                  label="Quantity"
                  variant="outlined"
                  sx={{ width: "46.5%", margin: 3 }}
                  value={quantity}
                  name="quantity"
                  onChange={handleChangeInput}
                  type="number"
                  helperText={errorInput.quantity && "Type must be a number."}
                />
                <TextField
                  error={errorInput.benchmark}
                  id="outlined-basic"
                  label="Benchmark"
                  variant="outlined"
                  sx={{ width: "46.5%", margin: 3 }}
                  value={benchmark}
                  name="benchmark"
                  onChange={handleChangeInput}
                  type="number"
                  helperText={errorInput.quantity && "Type must be a number."}
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

export default MajorProfile;
