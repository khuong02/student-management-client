import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import TableVirtualized from "../../components/TableVirtualized";
import {
  columnsClass,
  columnsTeacher,
  columnsSubject,
} from "../../components/CreateData";
import TabPanel from "../../components/basicTab/TabPanel";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const tabData = [
  { label: "Class" },
  { label: "Teacher" },
  { label: "Subject" },
];

export default function BasicTabs(props) {
  const {
    searchedData,
    hideButton,
    isOpen,
    handleChangeValueButton,
    handleChangeAssignmentData,
  } = props;
  const [columns, setColumns] = React.useState({
    name: "class",
    column: columnsClass,
  });

  React.useEffect(() => {
    switch (isOpen) {
      case 0:
        return setColumns({ name: "class", column: columnsClass });
      case 1:
        return setColumns({ name: "teacher", column: columnsTeacher });
      case 2:
        return setColumns({ name: "subject", column: columnsSubject });

      default:
        return setColumns({ name: "class", column: columnsClass });
    }
  }, [isOpen]);

  return (
    <Box sx={{ width: "50%", height: "95%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={isOpen}
          onChange={handleChangeValueButton}
          aria-label="basic tabs example"
        >
          {tabData.map((item, index) => {
            return (
              <Tab
                key={index}
                label={item.label}
                {...a11yProps(isOpen)}
                disabled={hideButton && item.label === "Subject" ? true : false}
              />
            );
          })}
        </Tabs>
      </Box>
      <TabPanel value={isOpen} index={isOpen}>
        <TableVirtualized
          data={searchedData}
          columns={columns.column}
          name={columns.name}
          handleChangeAssignmentData={handleChangeAssignmentData}
        />
      </TabPanel>
    </Box>
  );
}
