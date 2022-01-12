import React from "react";

import { motion } from "framer-motion";
import { useStyle } from "../../styles/useStyle";

import { Box, TextField, Button, Stack, Paper } from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const FormAddStudent = (props) => {
  const {
    hiddenForm,
    handleChangeInput,
    submitSearch,
    addStudentToClass,
    studentCode,
    listStudentCode,
    cancelStudentCodeHasChoose,
  } = props;

  const classes = useStyle();

  return (
    <motion.div className="container-form-add-student">
      <motion.div
        className="form-add-student"
        initial={{ scale: 0.8, opacity: 0.85 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0.85 }}
        transition={{ duration: 0.3 }}
      >
        <Stack style={{ height: "100%", justifyContent: "space-between" }}>
          <Box style={{ height: "80%" }}>
            <Box>
              <TextField
                id="outlined-basic"
                label="Search student's code"
                variant="outlined"
                onChange={handleChangeInput}
                className={classes.TextField}
                InputProps={{ classes: { input: classes.resize } }}
                size="small"
                onKeyPress={(e) => {
                  return e.key === "Enter" && submitSearch();
                }}
                //   InputProps={{ endAdornment: <SearchIcon /> }}
                value={studentCode}
                sx={{ m: 1, minWidth: 180, margin: 0 }}
              />
              <Button
                variant="contained"
                style={{ marginLeft: "10px" }}
                onClick={submitSearch}
              >
                Search
              </Button>
            </Box>
            <Box
              style={{
                overflowY: "auto",
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                marginTop: "10px",
              }}
            >
              {listStudentCode.map((item) => {
                return (
                  <Paper
                    variant="outlined"
                    key={item.studentCode}
                    style={{
                      padding: "0 2%",
                      borderRadius: "25px",
                      cursor: "pointer",
                    }}
                  >
                    {item.studentCode}
                    <Tooltip title="cancel">
                      <IconButton
                        onClick={() =>
                          cancelStudentCodeHasChoose(item.studentCode)
                        }
                      >
                        <ClearIcon />
                      </IconButton>
                    </Tooltip>
                  </Paper>
                );
              })}
            </Box>
          </Box>
          <Box style={{ textAlign: "right" }}>
            <Button
              style={{ marginRight: "10px" }}
              variant="contained"
              onClick={addStudentToClass}
              disabled={listStudentCode.length > 0 ? false : true}
            >
              Add
            </Button>
            <Button variant="contained" onClick={hiddenForm}>
              Cancel
            </Button>
          </Box>
        </Stack>
      </motion.div>
    </motion.div>
  );
};

export default FormAddStudent;
