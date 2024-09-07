import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/Authcontext";
const uselogin = () => {
  const [Loading, setLoading] = useState(false);
  const { setAuthuser } = useAuthContext();
  const login = async (username, password) => {
    const success = handleInputError(username, password);
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      if (data) {
        toast.success("Login successful");
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthuser(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { Loading, login };
};

function handleInputError(username, password) {
  if (!username || !password) {
    toast.error("All field are required");
    return false;
  }
  return true;
}

export default uselogin;
