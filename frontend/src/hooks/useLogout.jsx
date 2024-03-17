import { useState } from "react";
import { useAuthContext } from "../ContextApis/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const logout = async () => {
		setLoading(true);
		try {
			const res = await fetch("http://localhost:8000/api/auth/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.removeItem("chat-user");
			setAuthUser(null);
		} catch (error) {
			throw new Error(error);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogout;