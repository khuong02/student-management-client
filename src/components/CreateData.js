const rows = [];
const teachers = [];
const subjects = [];

const sample = [
  ["1", "CDTH18A", "TH", 2019, "01"],
  ["2", "CDTH19B", "TH", 2019, "01"],
  ["3", "CDCK20C", "CK", 2020, "02"],
  ["4", "CDCK20D", "CK", 2020, "02"],
  ["5", "CDTH20E", "TH", 2020, "01"],
];

const teacher = [
  ["1", "Nguyen Van A", "TH", 2019, "01"],
  ["2", "Nguyen Van B", "TH", 2019, "01"],
  ["3", "Nguyen Van C", "CK", 2020, "02"],
  ["4", "Nguyen Van D", "CK", 2020, "02"],
  ["5", "Nguyen Van E", "TH", 2020, "01"],
];

const subject = [
  ["1", "Nhap mon lap trinh 1", "TH", "I", "01"],
  ["2", "Nhap mon lap trinh 2", "TH", "II", "01"],
  ["3", "Nhap mon lap trinh 3", "TH", "III", "01"],
  ["4", "Nhap mon lap trinh 4", "TH", "IV", "01"],
  ["5", "Nhap mon lap trinh 5", "TH", "V", "01"],
];

const columnsClass = [
  {
    label: "ID CLASS",
    dataKey: "id",
  },
  {
    label: "NAME CLASS",
    dataKey: "className",
    numeric: true,
  },
  {
    label: "NAME MAJOR",
    dataKey: "nameMajor",
    numeric: true,
  },
  {
    label: "YEAR",
    dataKey: "year",
    numeric: true,
  },
];

const columnsTeacher = [
  {
    label: "ID TEACHER",
    dataKey: "id",
  },
  {
    label: "NAME TEACHER",
    dataKey: "teacherName",
    numeric: true,
  },
  {
    label: "NAME MAJOR",
    dataKey: "nameMajor",
    numeric: true,
  },
  {
    label: "YEAR",
    dataKey: "year",
    numeric: true,
  },
];

const columnsSubject = [
  {
    label: "ID SUBJECT",
    dataKey: "id",
  },
  {
    label: "NAME SUBJECT",
    dataKey: "subjectName",
    numeric: true,
  },
  {
    label: "TYPE SUBJECT",
    dataKey: "typeSubject",
    numeric: true,
  },
  {
    label: "NAME MAJOR",
    dataKey: "nameMajor",
    numeric: true,
  },
];

const columnStudent = [
  {
    label: "ID STUDENT",
    dataKey: "id",
  },
  {
    label: "NAME STUDENT",
    dataKey: "studentName",
    numeric: false,
  },
  {
    label: "BIRTHDAY",
    dataKey: "birthday",
    numeric: false,
  },
];

function createDataClass(id, className, nameMajor, year, idMajor) {
  return {
    id,
    className,
    nameMajor,
    year,
    idMajor,
  };
}

function createDataTeacher(id, teacherName, nameMajor, year, uuid, idMajor) {
  return {
    id,
    teacherName,
    nameMajor,
    year,
    uuid,
    idMajor,
  };
}

function createDataSubject(id, subjectName, nameMajor, typeSubject, idMajor) {
  return {
    id,
    subjectName,
    nameMajor,
    typeSubject,
    idMajor,
  };
}

for (let i = 0; i < 200; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createDataClass(...randomSelection));
}

for (let i = 0; i < 200; i += 1) {
  const randomSelection = teacher[Math.floor(Math.random() * sample.length)];
  teachers.push(createDataTeacher(...randomSelection));
}

for (let i = 0; i < 200; i += 1) {
  const randomSelection = subject[Math.floor(Math.random() * sample.length)];
  subjects.push(createDataSubject(...randomSelection));
}

module.exports = {
  rows,
  teachers,
  subjects,
  columnsClass,
  columnsTeacher,
  columnsSubject,
  columnStudent,
  createDataClass,
  createDataTeacher,
  createDataSubject,
};
