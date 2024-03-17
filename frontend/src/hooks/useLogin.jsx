import { useState } from "react";
import { useAuthContext } from "../ContextApis/AuthContext";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const {setAuthUser} = useAuthContext();

	const login = async ({username, password}) => {
		setLoading(true);
		try {
			const res = await fetch("http://localhost:8000/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await res.json();
			if (!res.ok) {
                throw new Error(data.error || "Login failed");
            }
			localStorage.removeItem("chat-user")
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		}catch (error) {
            throw new Error(error.message || "Login failed");
        } finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;