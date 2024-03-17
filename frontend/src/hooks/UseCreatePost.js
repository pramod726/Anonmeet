import axios from "axios";
import toast from "react-hot-toast";

const serverUrl = "http://localhost:8000/";
const createPostUrl = "api/post/create";

const UseCreatePost = async (data) => {
  const { title, description, image } = data;
  
  const success = handleInputErrors({ title });
  if (!success) return;
  
  const formData = new FormData();
  formData.append("title", title);
  formData.append("body", description);
  if (image) {
    formData.append("image", image);
  }

  try {
    const chatUser = JSON.parse(localStorage.getItem('chat-user'));
    const token = chatUser.token;
    const response = await axios.post(`${serverUrl}${createPostUrl}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorisation': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    const message = error.response ? error.response.data.message : error.message;
    toast.error(message);
    return { success: false, message };
  }
};

function handleInputErrors({ title }) {
  if (!title) {
    toast.error("Title is required");
    return false;
  }
  return true;
}

export default UseCreatePost;
