import axios from "axios";
import toast from "react-hot-toast";
const serverUrl = "http://localhost:8000/";

const createPostUrl = "api/post/create";

const UseCreatePost= async (data) => {
  const {title,description } = data;
  const success = handleInputErrors({title});
	if (!success) return;
  return await axios
    .post(`${serverUrl}${createPostUrl}`, {
      title,
      body: description,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      const message = err.response ? err.response.data.message : err.message;
      return { success: false, message: message };
    });
};
export default UseCreatePost;

function handleInputErrors({title}) {
	if ( !title) {
		toast.error("Title is required");
		return false;
	}
	return true;
}