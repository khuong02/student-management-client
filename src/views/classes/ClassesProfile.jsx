import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { AnimatePresence } from "framer-motion";
import { useSnackbar } from "notistack";

import methodApi from "../../api/methodApi";

import { Box, Stack, Card, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import TableVirtualized from "../../components/TableVirtualized";
import { columnStudent } from "../../components/CreateData";
import { formatDate } from "../../moment/moment";
import FormAddStudent from "../../components/classes/FormAddStudent";

const initialStateClass = {
  infoClass: {},
  err: null,
};

const initialStateStudentInClass = {
  students: [],
  err: null,
};

const formatData = (id, studentName = "", birthday = "") => ({
  id,
  studentName,
  birthday: formatDate(birthday),
});

const ClassesProfile = () => {
  const { studentsList } = useSelector((state) => state.student);
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams()["classesId"];

  const [data, setData] = useState(initialStateClass);
  const [studentInClass, setStudentInClass] = useState(
    initialStateStudentInClass
  );
  const [studentCode, setStudentCode] = useState("");
  const [listStudentCode, setListStudentCode] = useState([]);
  const [open, setOpen] = useState(false);

  const { infoClass, err } = data;
  const { students } = studentInClass;

  useEffect(() => {
    const fetchDataClassesProfile = async () => {
      try {
        const res = await methodApi.getForId("/api/classes", params);

        if (res.status === 400)
          return setData((currentState) => ({
            ...currentState,
            err: res.data.msg,
          }));

        setData((currentState) => ({
          ...currentState,
          infoClass: res.data,
          err: null,
        }));
      } catch (err) {
        console.log(err.response);
      }
    };

    fetchDataClassesProfile();
  }, [params]);

  useEffect(() => {
    const fetchDataStudentInClass = async () => {
      try {
        const res = await methodApi.getForId("/api/classes/getStudent", params);

        if (res.status === 400 && res.data.success === false)
          return setStudentInClass((currentState) => ({
            ...currentState,
            err: res.data.msg,
          }));

        setStudentInClass((currentState) => ({
          ...currentState,
          students: res.data.map((obj) =>
            formatData(obj.studentCode, obj.name, obj.birthday)
          ),
          err: null,
        }));
      } catch (err) {
        console.log(err.response);
      }
    };

    fetchDataStudentInClass();
  }, [params]);

  const handleChangeInput = (e) => {
    const { value } = e.target;
    setStudentCode(value);
  };

  const submitSearch = () => {
    if (studentCode.trim() === "" || listStudentCode.includes(studentCode))
      return;

    const findStudent = studentsList.find(
      (obj) => obj.studentCode === studentCode
    );

    if (!findStudent) {
      enqueueSnackbar("This student does't exist", { variant: "error" });
      return;
    }

    setListStudentCode((currentState) => [...currentState, findStudent]);

    setStudentCode("");
  };

  const addStudentToClass = async (e) => {
    e.preventDefault();
    try {
      const res = await methodApi.post("/api/user/add_student", {
        list_student: listStudentCode.map((obj) => obj.uuid),
        classCode: params,
      });

      if (res.status === 400 || res.status === 500) {
        enqueueSnackbar(res.data.msg, { variant: "error" });
        return;
      }

      window.location.href = `/classes/${params}`;
    } catch (err) {
      err.response.data.msg &&
        enqueueSnackbar(err.response.data.msg, { variant: "error" });
    }
  };

  const hiddenForm = (e) => {
    e.preventDefault();
    setOpen(!open);
  };

  const cancelStudentCodeHasChoose = (studentCode) => {
    setListStudentCode((currentList) =>
      currentList.filter((obj) => obj.studentCode !== studentCode)
    );
  };

  return (
    <Stack style={{ height: "100%", position: "relative" }}>
      <AnimatePresence exitBeforeEnter initial={false}>
        {open && (
          <FormAddStudent
            hiddenForm={hiddenForm}
            handleChangeInput={handleChangeInput}
            addStudentToClass={addStudentToClass}
            submitSearch={submitSearch}
            studentCode={studentCode}
            listStudentCode={listStudentCode}
            cancelStudentCodeHasChoose={cancelStudentCodeHasChoose}
          />
        )}
      </AnimatePresence>
      <Box style={{ height: "30%" }}>
        {err && <h3>{err}</h3>}
        <Card
          style={{
            margin: "1%",
            height: "80%",
            background: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
            boxShadow: "none",
            padding: "0 1%",
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography
                variant="h2"
                style={{
                  color: "#fff",
                  fontWeight: "400",
                  letterSpacing: "1.1px",
                }}
              >
                {infoClass.className}
              </Typography>
              <Typography
                variant="h6"
                style={{
                  color: "#fff",
                  fontWeight: "400",
                  letterSpacing: "1.1px",
                }}
              >
                Homeroom Teacher:
                <Typography variant="p" style={{ marginLeft: "5px" }}>
                  {infoClass.nameTeacher
                    ? infoClass.nameTeacher
                    : "Not Teacher ♥"}
                </Typography>
              </Typography>
              <Typography
                variant="p"
                style={{
                  color: "#fff",
                  fontWeight: "300",
                  letterSpacing: "1.1px",
                }}
              >
                Quantity: {infoClass.quantity}
              </Typography>
            </Box>
            <Box>
              <Tooltip title="Add student">
                <IconButton onClick={hiddenForm}>
                  <PersonAddIcon style={{ width: "40px", height: "40px" }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
        </Card>
      </Box>
      <Box style={{ height: "70%" }}>
        <TableVirtualized
          data={studentInClass.err ? [{ id: studentInClass.err }] : students}
          columns={columnStudent}
        />
      </Box>
    </Stack>
  );
};

export default ClassesProfile;
