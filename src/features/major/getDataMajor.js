import methodApi from "../../api/methodApi";

const getDataMajor = {
  getMajor: async () => {
    return new Promise((resolve, reject) => {
      const getData = async () => {
        try {
          const major = await methodApi.getAll("/api/majors");

          if (!major || major.success === false) resolve([]);

          resolve(major.data);
        } catch (err) {
          reject(err.response.data);
        }
      };
      getData();
    });
  },
};

export default getDataMajor;
