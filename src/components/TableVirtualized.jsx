import * as React from "react";
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import MuiVirtualizedTable from "./table/VirtualizedTable";

import { styles } from "../styles/useStyle";

ReactVirtualizedTable.propTypes = {
  data: PropTypes.array.isRequired,
};

ReactVirtualizedTable.defaultProps = {
  data: [],
};

const defaultTheme = createTheme();
const VirtualizedTableComponent = withStyles(styles, { defaultTheme })(
  MuiVirtualizedTable
);

const useContainerDimensions = (myRef) => {
  const [dimensions, setDimensions] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setDimensions(myRef.current.offsetWidth);
    };

    if (myRef.current) {
      setDimensions(myRef.current.offsetWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef]);

  return dimensions;
};

export default function ReactVirtualizedTable(props) {
  const { data } = props;

  const componentRef = useRef();
  const width = useContainerDimensions(componentRef);

  return (
    <Paper style={{ height: "100%", width: "100%" }} ref={componentRef}>
      <VirtualizedTableComponent
        rowCount={data.length}
        rowGetter={({ index }) => data[index]}
        columns={[
          {
            width: width / 4,
            label: "ID CLASS",
            dataKey: "id",
          },
          {
            width: width / 4,
            label: "NAME CLASS",
            dataKey: "className",
            numeric: true,
          },
          {
            width: width / 4,
            label: "NAME MAJOR",
            dataKey: "nameMajor",
            numeric: true,
          },
          //   {
          //     width: width / 5,
          //     label: "ID MAJOR",
          //     dataKey: "idMajor",
          //     numeric: true,
          //   },
          {
            width: width / 4,
            label: "YEAR",
            dataKey: "year",
            numeric: true,
          },
        ]}
      />
    </Paper>
  );
}
