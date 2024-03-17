import { useState } from "react";
import useConversation from "../hooks/useConversation";
import toast from "react-hot-toast";
import { useAuthContext } from "../ContextApis/AuthContext";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
	const { authUser } = useAuthContext();

	const sendMessage = async (message) => {
		setLoading(true);
		const senderId = authUser._id;
		console.log(senderId)
		

		try {
			const res = await fetch(`http://localhost:8000/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message , senderId }),
			});
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
export default useSendMessage;