import toast from "react-hot-toast";
import { useAuthContext } from "../ContextApis/AuthContext";


const useGetFollowing = () => {
    const {authUser} = useAuthContext();
	const senderId = authUser.username
    c

	const getFollowing = async () => {

	
		try {
			const res = await fetch(`http://localhost:8000/api/messages/${selectedConversation._id}?senderId=${senderId}`);
			const data = await res.json();
			if (data.error) throw new Error(data.error);
			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useGetFollowing;