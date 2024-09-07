import { useState } from "react";
import { useAuthContext } from "../context/Authcontext";
import toast from "react-hot-toast";

const uselogout = () => {
  const [Loading, setLoading] = useState(false);
  const { setAuthuser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log(data);

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("chat-user");
      setAuthuser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { Loading, logout };
};
export default uselogout;
