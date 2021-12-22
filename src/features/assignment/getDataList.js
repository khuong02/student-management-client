import methodApi from "../../api/methodApi";

const getDataList = {
  getStudentsList: async () => {
    return new Promise((resolve, reject) => {
      const getData = async () => {
        try {
          const res = await methodApi.getAll(`/api/user/get_student_list`);
          if (!res.status === 400) reject(res.data.msg);
          resolve(res.data);
        } catch (err) {
          reject(err.response.data);
        }
      };
      getData();
    });
  },
  getTeachersList: async () => {
    return new Promise((resolve, reject) => {
      const getData = async () => {
        try {
          const res = await methodApi.getAll(`/api/user/get_teacher_list`);
          if (!res.status === 400) reject(res.data.msg);
          resolve(res.data);
        } catch (err) {
          reject(err.response.data);
        }
      };
      getData();
    });
  },
};

export default getDataList;
