import * as React from "react";
// import { useEffect, useState, useRef } from "react";
// import PropTypes from "prop-types";

// import { withStyles } from "@mui/styles";
// import { createTheme } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";
// import MuiVirtualizedTable from "./VirtualizedTable";
import SortTable from "./SortTable";
// import Visibility from "@mui/icons-material/Visibility";

// import { styles } from "../../styles/useStyle";

// const defaultTheme = createTheme();
// const VirtualizedTableComponent = withStyles(styles, { defaultTheme })(
//   MuiVirtualizedTable
// );

// const sample = [
//   ["Frozen yoghurt", 159, 6.0, 24, 4.0],
//   ["Ice cream sandwich", 237, 9.0, 37, 4.3],
//   ["Eclair", 262, 16.0, 24, 6.0],
//   ["Cupcake", 305, 3.7, 67, 4.3],
//   ["Gingerbread", 356, 16.0, 49, 3.9],
// ];

// function createData(id, className, quantityStudent, nameMajor, year) {
//   return {
//     id,
//     className,
//     quantityStudent,
//     nameMajor,
//     year,
//     view: <Visibility />,
//   };
// }

// const rows = [];

// for (let i = 0; i < 200; i += 1) {
//   const randomSelection = sample[Math.floor(Math.random() * sample.length)];
//   rows.push(createData(i, ...randomSelection));
// }

// const useContainerDimensions = (myRef) => {
//   const [dimensions, setDimensions] = useState(0);

//   useEffect(() => {
//     const handleResize = () => {
//       setDimensions(myRef.current.offsetWidth);
//     };

//     if (myRef.current) {
//       setDimensions(myRef.current.offsetWidth);
//     }

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [myRef]);

//   return dimensions;
// };

export default function ReactVirtualizedTable(props) {
  //   const { sample } = props;

  //   const componentRef = useRef();
  //   const width = useContainerDimensions(componentRef);

  return (
    <SortTable />
    // <Paper style={{ height: 700, width: "100%" }} ref={componentRef}>
    //   <VirtualizedTableComponent
    //     rowCount={rows.length}
    //     rowGetter={({ index }) => rows[index]}
    //     columns={[
    //       {
    //         width: width / 6,
    //         label: "ID CLASS",
    //         dataKey: "id",
    //       },
    //       {
    //         width: width / 6,
    //         label: "NAME CLASS",
    //         dataKey: "className",
    //         numeric: true,
    //       },
    //       {
    //         width: width / 6,
    //         label: "QUANTITY STUDENT",
    //         dataKey: "quantityStudent",
    //         numeric: true,
    //       },
    //       {
    //         width: width / 6,
    //         label: "NAME MAJOR",
    //         dataKey: "nameMajor",
    //         numeric: true,
    //       },
    //       {
    //         width: width / 6,
    //         label: "YEAR",
    //         dataKey: "year",
    //         numeric: true,
    //       },
    //       {
    //         width: width / 6,
    //         label: "VIEW",
    //         dataKey: "view",
    //         numeric: true,
    //       },
    //     ]}
    //   />
    // </Paper>
  );
}
