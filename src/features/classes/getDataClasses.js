import methodApi from "../../api/methodApi";

const getDataClasses = {
  getClasses: async () => {
    return new Promise((resolve, reject) => {
      const getData = async () => {
        try {
          const classes = await methodApi.getAll("/api/classes");

          if (!classes || classes.success === false) resolve([]);

          resolve(classes.data);
        } catch (err) {
          reject(err.response.data);
        }
      };
      getData();
    });
  },
};

export default getDataClasses;
