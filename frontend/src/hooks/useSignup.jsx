import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../ContextApis/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext(); // Destructure setAuthUser from useAuthContext

    const signup = async ({ username, email, password, confirmPassword }) => {

        setLoading(true);
        try {
            const res = await fetch("http://localhost:8000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password, confirmPassword }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Signup failed");
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data); // Set authenticated user using setAuthUser from AuthContext
            toast.success("Signup successful!");
        } catch (error) {
            throw new Error(error.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;
