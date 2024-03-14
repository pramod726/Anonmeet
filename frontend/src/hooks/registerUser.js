import axios from "axios";
const serverUrl = "http://localhost:8000/";

const registerUrl = "api/auth/signup";

const registerUser= async (data) => {
  const { username, email, password} = data;
  return await axios
    .post(`${serverUrl}${registerUrl}`, {
      username,
      email,
      password,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      const message = err.response ? err.response.data.message : err.message;
      return { success: false, message: message };
    });
};
export default registerUser;