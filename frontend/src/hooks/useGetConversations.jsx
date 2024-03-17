import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import { useAuthContext } from "../ContextApis/AuthContext";


const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);
	// const {authUser} = useAuthContext();
	// const userId = authUser.username

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				console.log("bug2")
				const res = await fetch(`http://localhost:8000/api/users/`);
				const data = await res.json();
				console.log("bug1")
				console.log(data)
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;