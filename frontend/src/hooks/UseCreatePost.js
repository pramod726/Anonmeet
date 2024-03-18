import axios from "axios";
import toast from "react-hot-toast";

const serverUrl = "http://localhost:8000/";
const createPostUrl = "api/post/create";

const UseCreatePost = async (data) => {
  const { title, description, image } = data;

  const success = handleInputErrors({ title });
  if (!success) return;

  const postData = {
    title,
    description,
    image
  };
  try {
    const chatUser = JSON.parse(localStorage.getItem('chat-user'));
    const token = chatUser.token;
    console.log(postData)
    const response = await axios.post(`${serverUrl}${createPostUrl}`, postData, {
      headers: {
        "Content-Type": "application/json",
        'Authorisation': `Bearer ${token}`,
      }
    });

    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error(error);
    const message = error.response ? error.response.data.message : error.message;
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
