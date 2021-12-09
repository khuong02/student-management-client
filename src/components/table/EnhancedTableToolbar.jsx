import React from "react";
import PropTypes from "prop-types";

import { alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Option from "./Option";

const EnhancedTableToolbar = (props) => {
  const {
    numSelected,
    handleFilterChange,
    handleSearch,
    nameTable,
    optionFilterData,
  } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%", textTransform: "uppercase" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {nameTable}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Option
            optionFilterData={optionFilterData}
            handleFilterChange={handleFilterChange}
            handleSearch={handleSearch}
          />
        </>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

EnhancedTableToolbar.defaultProps = {
  handleFilterChange: null,
  handleSearch: null,
};

export default EnhancedTableToolbar;
