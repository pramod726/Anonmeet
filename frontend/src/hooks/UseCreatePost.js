import axios from "axios";
import toast from "react-hot-toast";
const serverUrl = "http://localhost:8000/";

const createPostUrl = "api/post/create";

const UseCreatePost = async (data) => {
  const {title,description } = data;
  const success = handleInputErrors({title});
	if (!success) return;
  try {
    const chatUser = JSON.parse(localStorage.getItem('chat-user'));
    const token = chatUser.token;

    const response = await fetch(`${serverUrl}${createPostUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorisation': `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        body: description
      })
    });
    
    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message);
    }
  
    const data = await response.json();
    return data;
  } catch (err) {
    const message = err.message;
    return { success: false, message: message };
  }
  
};
export default UseCreatePost;

function handleInputErrors({title}) {
	if ( !title) {
		toast.error("Title is required");
		return false;
	}
	return true;
}