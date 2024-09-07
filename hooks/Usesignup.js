import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/Authcontext";

const Usesignup = () => {
  const [Loading, setLoading] = useState(false);
  const { setAuthuser } = useAuthContext();
  const signup = async ({
    fullName,
    username,
    password,
    confirmpassword,
    gender,
    avatar,
  }) => {
    const success = handleInputError({
      fullName,
      username,
      password,
      confirmpassword,
      gender,
    });

    if (!success) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(" /api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmpassword,
          gender,
          avatar,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      //Localstorage
      localStorage.setItem("chat-user", JSON.stringify(data));
      //context
      setAuthuser(data);
      console.log(data);
      toast.success("Signup successful");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { Loading, signup };
};

export default Usesignup;

function handleInputError({
  fullName,
  username,
  password,
  confirmpassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmpassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password != confirmpassword) {
    toast.error("Password do not match ");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be atleast 6 character");
    return false;
  }
  return true;
}
