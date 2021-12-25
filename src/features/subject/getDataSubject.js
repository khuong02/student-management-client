import methodApi from "../../api/methodApi";

const getDataSubject = {
  getSubject: async () => {
    return new Promise((resolve, reject) => {
      const getData = async () => {
        try {
          const subject = await methodApi.getAll("/api/subjects");

          if (!subject || subject.success === false) resolve([]);

          resolve(subject.data);
        } catch (err) {
          reject(err.response.data);
        }
      };
      getData();
    });
  },
};

export default getDataSubject;
