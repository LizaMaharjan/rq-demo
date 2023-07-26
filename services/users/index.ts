import axios from "axios";

export const getUserList = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const postUser = async ({ payload }: any) => {
  try {
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      payload
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
