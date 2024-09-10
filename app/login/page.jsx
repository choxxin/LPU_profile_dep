"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Update_course_detail } from "../api/umsinfo";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/useUserStore";

function Login() {
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Login, setLogin] = useState(true);
  const {
    setRegistrationNumber,
    setPass,
    setCook,
    setName,
    setdp,
    name,
    setThemetop,
    setThemedown,
    setId,
  } = useUserStore();
  const [avatar, setavatar] = useState(
    "https://i.pinimg.com/736x/10/69/78/106978ee91833c26c509563a0bc89b87.jpg"
  );

  const [Loadingg, setLoadingg] = useState(false);
  const [ImageLoad, setImageLoad] = useState(true);
  const changeanime = async (e) => {
    e.preventDefault();
    setLoadingg(true);
    setImageLoad(false);

    try {
      const response = await fetch("https://nekos.life/api/v2/img/neko");
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const data = await response.json();
      setavatar(data.url);

      setLoadingg(false);
    } catch (error) {
      console.error("Error fetching image:", error);
      setLoadingg(false);
    }
  };

  const Loadhandler = () => {
    setImageLoad(true);
  };

  useEffect(() => {
    console.log("Avatar updated:", avatar);
    setavatar(avatar);
  }, [avatar]);
  const handleLogin = async (e) => {
    e.preventDefault();
    let loginData;
    try {
      setloading(true);

      // Make a request to the API route for login
      const response = await fetch("/api/loginn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reg_no: username,
          password,
          avatar: !Login ? avatar : undefined, // Only send avatar if Login is true
        }),
      });

      // Handle response
      if (!response.ok) {
        throw new Error("Wrong credentials");
      }

      loginData = await response.json();

      const { cookie, token } = loginData;

      // Store token in local storage
      localStorage.setItem("token", token);

      // Store the cookie in the browser
      Cookies.set("session", cookie, { path: "/" });

      // Fetch user details
      const userResponse = await fetch("/api/userDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reg_no: username, password, cookie }),
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user details");
      }

      const meow = await userResponse.json();

      // Optionally: Update course details
      await fetch("/api/exams/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reg_no: username, password, cookie }),
      });

      await fetch("/api/updatecourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reg_no: username, password, cookie }),
      });

      // Update state with user details
      setName(meow.user.name);
      setId(meow.user._id);
      setRegistrationNumber(username);
      setPass(password);
      setCook(cookie);
      setdp(meow.user.profile_image);
      setThemetop(meow.user.themetop);
      setThemedown(meow.user.themedown);

      toast.success("Login Successful");
      router.push("/"); // Redirect to home page after successful login
    } catch (error) {
      toast.error("Login failed: " + error.message);
      console.log("Login Error:", error);
    } finally {
      setloading(false); // Set loading state to false
    }
  };
  const handleToggle = () => {
    setLogin((prevState) => !prevState); // Toggle the state
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-200 to-gray-400">
      {Login && (
        <div className="avatar flex items-center mb-10 animate-fadeIn">
          <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg">
            <img
              src={avatar}
              onLoad={Loadhandler}
              alt="User Avatar"
              className="object-cover w-full h-full"
            />
          </div>
          <button
            className={`btn btn-ghost ml-7 text-white border-2 border-gray-300 bg-gray-700 hover:bg-gray-600 transition-all duration-300 px-4 py-2 rounded-lg ${
              Loadingg ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={changeanime}
            disabled={Loadingg}
          >
            {!Loadingg && ImageLoad ? (
              "Change Avatar"
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
        </div>
      )}

      <div className="form-control w-52 mb-8 animate-fadeIn">
        <label className="label cursor-pointer">
          <span className="label-text font-semibold text-xl text-gray-700">
            {Login ? "Switch to Login" : "Switch to Register"}
          </span>
          <input
            type="checkbox"
            className="toggle toggle-accent"
            checked={Login}
            onChange={handleToggle}
          />
        </label>
      </div>

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-2xl w-80 animate-slideUp"
      >
        <h2 className="text-3xl flex flex-center gap-5 font-bold mb-6 text-center text-gray-800">
          <img
            src="data:image/png;base64,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"
            alt="LPU Logo"
            className="w-24 h-24 mb-6"
          />
          {Login ? "Register" : "Login"} to LPU Profile
        </h2>

        <div className="mb-6">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Registration Number
          </label>
          <input
            type="text"
            id="username"
            className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-slate-200"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            UMS Password
          </label>
          <input
            type="password"
            id="password"
            className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-slate-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {loading ? (
            <span className="loading loading-infinity loading-sm"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;
