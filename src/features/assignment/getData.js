import methodApi from "../../api/methodApi";

const getDataList = {
  getAssignmentList: async () => {
    return new Promise((resolve, reject) => {
      const getData = async () => {
        try {
          const res = await methodApi.getAll(`/api/assignment/getAssignment`);
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
