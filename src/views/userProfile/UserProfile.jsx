import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import methodApi from "../../api/methodApi";
import { updateUser, userPending } from "../../features/user";

import { Box, Typography, Card, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import AnimationChangePage from "../../layout/AnimationChangePage";
import { formatDefaultPropsInput } from "../../moment/formatDefaultPropsInput";

const HidePasswordsButton = ({ hidePassword, setHidePassword, name }) => {
  const hidePasswordFunc = () =>
    setHidePassword((currentState) => ({
      ...currentState,
      [name]: !hidePassword,
    }));

  return (
    <>
      <Tooltip title="Add student">
        <IconButton onClick={hidePasswordFunc}>
          {hidePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </Tooltip>
    </>
  );
};

const UserProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [hidePassword, setHidePassword] = useState({
    newPassword: false,
    cf_password: false,
  });
  const [currentState, setCurrentState] = useState({
    roles: currentUser.roles,
    name: currentUser.name,
    birthday: currentUser.birthday,
    newPassword: "",
    cf_password: "",
  });
  const [selectChange, setSelectChange] = useState(true);

  const { newPassword, cf_password } = hidePassword;
  const { name, birthday } = currentState;

  useEffect(() => {
    if (
      currentState.name !== currentUser.name ||
      currentState.birthday !== currentUser.birthday ||
      currentState.newPassword.trim() !== ""
    )
      return setSelectChange(false);
    return setSelectChange(true);
  }, [currentState, currentUser]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCurrentState({ ...currentState, [name]: value });
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    try {
      dispatch(userPending());
      const res = await methodApi.update(
        `/api/user/change_profile/${currentUser.uuid}`,
        currentState
      );

      console.log(res);

      if (res.status === 400 || res.status === 500) {
        enqueueSnackbar(res.data.msg, { variant: "error" });
        return;
      }

      dispatch(updateUser(currentState));
      if (
        currentState.newPassword.trim() !== "" ||
        currentState.cf_password.trim() !== ""
      ) {
        setCurrentState({
          ...currentState,
          newPassword: "",
          cf_password: "",
        });
      }

      enqueueSnackbar(res.msg, { variant: "success" });
    } catch (err) {
      err.response && console.log(err.response);
    }
  };

  return (
    <AnimationChangePage>
      <Box padding={3}>
        <Box>
          <Typography variant="h2" fontWeight="bold">
            Edit Profile
          </Typography>
        </Box>
        <Box>
          <Card
            sx={{ padding: 3, flexWrap: "wrap", width: "auto" }}
            variant="outlined"
          >
            <Box>
              <Avatar
                sx={{
                  margin: "auto",
                  width: "135px",
                  height: "135px",
                  fontSize: "45px",
                }}
              >
                K
              </Avatar>
            </Box>
            <TextField
              id="outlined-basic account"
              label="Account"
              variant="outlined"
              sx={{ width: "100%", marginBlock: 3 }}
              defaultValue={currentUser.account}
              disabled
            />
            <Box
              sx={{
                width: "100%",
                marginBlock: 3,
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              <TextField
                id="outlined-basic name"
                label="Name"
                variant="outlined"
                sx={{ width: "49%" }}
                value={name}
                name="name"
                onChange={handleChangeInput}
              />
              <TextField
                id="outlined-basic roles"
                label="Roles"
                variant="outlined"
                sx={{ width: "49%" }}
                defaultValue={currentUser.roles}
                disabled
              />
            </Box>
            <TextField
              id="outlined-basic birthday"
              label="Birthday"
              variant="outlined"
              sx={{ width: "100%", marginBlock: 3 }}
              value={formatDefaultPropsInput(birthday)}
              name="birthday"
              onChange={handleChangeInput}
              type="date"
            />
            <TextField
              id="outlined-basic nameMajor"
              label="Name Major"
              variant="outlined"
              sx={{ width: "100%", marginBlock: 3 }}
              defaultValue={currentUser.nameMajor}
              disabled
            />
            <TextField
              id="outlined-basic newPassword"
              label="New Password"
              variant="outlined"
              sx={{ width: "100%", marginBlock: 3 }}
              type={newPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <HidePasswordsButton
                    hidePassword={newPassword}
                    setHidePassword={setHidePassword}
                    name="newPassword"
                  />
                ),
              }}
              value={currentState.newPassword}
              name="newPassword"
              onChange={handleChangeInput}
            />
            <TextField
              id="outlined-basic cf_password"
              label="Confirm Password"
              variant="outlined"
              sx={{ width: "100%", marginBlock: 3 }}
              InputProps={{
                endAdornment: (
                  <HidePasswordsButton
                    hidePassword={cf_password}
                    setHidePassword={setHidePassword}
                    name="cf_password"
                  />
                ),
              }}
              type={cf_password ? "text" : "password"}
              value={currentState.cf_password}
              name="cf_password"
              onChange={handleChangeInput}
            />
            <Box sx={{ marginInline: 0 }}>
              <Button
                variant="contained"
                sx={{ paddingInline: 4, paddingBlock: 1.8, fontSize: 16 }}
                onClick={handleSubmitProfile}
                disabled={selectChange}
              >
                Update
              </Button>
            </Box>
          </Card>
        </Box>
      </Box>
    </AnimationChangePage>
  );
};

export default UserProfile;
