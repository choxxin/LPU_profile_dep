"use client";
import UserProfile from "../components/sidebar";
import Leetcode from "@/components/leetcode";
import Image from "next/image";
import { useState, useEffect } from "react";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Subjectt from "@/components/graph/Subattendence";
import ThemeSwitcher from "@/components/NightButton";
import useAuthRedirect from "@/utils/useAuthredirect";
import { IoIosNotificationsOutline } from "react-icons/io";
import {
  loginUser,
  getUserDetails,
  handleleetcodeprofile,
  getProfileByRegistrationNumber,
  deleteUserAndProfile,
} from "../app/api/umsinfo";
import Cookies from "js-cookie";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import UserList from "@/components/userList";
import Lapuinfo from "@/components/lapuinfo";
import Announcements from "@/components/Announcements";
import Posts from "@/components/Posts/Posts"; // Assuming you have a component for posts
import { Router } from "next/router";
import Leaderboard from "@/components/LeaderBoard/leaderboard";
import { DialogUser } from "@/components/Responsive/Dialuser";
import RecentChats from "@/components/chatting/Recentchat";

export default function Home() {
  useAuthRedirect();
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeContent, setActiveContent] = useState("profile"); // State to manage active content
  const { registrationNumber, dp, name, id } = useUserStore();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const onLogout = async () => {
    localStorage.removeItem("token");

    router.push("/login");
  };

  useEffect(() => {
    // This will set `isClient` to true only after the component has mounted
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="navbar bg-slate-300 dark:bg-slate-800 min-h-20">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden dark:text-zinc-50  "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <p
                  className={activeContent === "profile" ? "bg-sky-400" : ""}
                  onClick={() => setActiveContent("profile")}
                >
                  <DialogUser
                    setSelectedUser={setSelectedUser}
                    selectedUser={selectedUser}
                  />
                </p>
              </li>
              <li>
                <details className="group">
                  <summary className="cursor-pointer select-none hover:text-blue-500">
                    Notification
                  </summary>
                  <div className="absolute left-0 mt-2 min-w-[370px] min-h-56 shadow-lg h-full w-full text-white bg-black rounded-md   border border-gray-900 z-50 dark:text-white overflow-scroll overflow-x-hidden">
                    <RecentChats userId={id} />
                  </div>
                </details>
              </li>
              <li>
                <a>Explore</a>
                <ul className="p-2">
                  <li>
                    <a
                      className={activeContent === "posts" ? "bg-sky-400" : ""}
                      onClick={() => setActiveContent("posts")}
                    >
                      Posts
                    </a>
                  </li>
                  <li>
                    <a
                      className={activeContent === "status" ? "bg-sky-400" : ""}
                      onClick={() => setActiveContent("status")}
                    >
                      Status
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  className={activeContent === "leader" ? "bg-sky-400" : ""}
                  onClick={() => setActiveContent("leader")}
                >
                  LeaderBoard
                </a>
              </li>

              <li>
                <details className="group">
                  <summary className="cursor-pointer select-none hover:text-blue-500">
                    Announcements
                  </summary>
                  <div className="absolute left-0 mt-2 min-w-[410px] min-h-96 shadow-lg h-full w-full text-white bg-black rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-900 z-50 dark:text-white">
                    <Announcements />
                  </div>
                </details>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl hidden md:inline-block dark:text-white">
            LPU PROFILE
          </a>
          <img
            src="https://upload.wikimedia.org/wikipedia/en/3/3a/Lovely_Professional_University_logo.png"
            height={70}
            width={60}
          ></img>
        </div>
        <div className="navbar-center hidden lg:flex dark:text-white">
          <ul className="menu menu-horizontal px-1">
            <li>
              <p
                className={activeContent === "profile" ? "bg-sky-400" : ""}
                onClick={() => setActiveContent("profile")}
              >
                User
              </p>
            </li>
            <li>
              <details className="group">
                <summary className="cursor-pointer select-none hover:text-blue-500">
                  Announcements
                </summary>
                <div className="absolute left-0 mt-2 min-w-[630px] min-h-96 shadow-lg h-full w-full text-white bg-black rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-900 z-50 dark:text-white">
                  <Announcements />
                </div>
              </details>
            </li>
            <li>
              <a
                className={activeContent === "posts" ? "bg-sky-400" : ""}
                onClick={() => setActiveContent("posts")}
              >
                Posts
              </a>
            </li>
            <li>
              <a
                className={activeContent === "status" ? "bg-sky-400" : ""}
                onClick={() => setActiveContent("status")}
              >
                Status
              </a>
            </li>
            <li>
              <a
                className={activeContent === "leader" ? "bg-sky-400" : ""}
                onClick={() => setActiveContent("leader")}
              >
                LeaderBoard
              </a>
            </li>
            <li>
              <details className="group">
                <summary className="cursor-pointer select-none hover:text-blue-500">
                  <IoIosNotificationsOutline className="h-6 w-6" />
                </summary>
                <div className="absolute left-0 mt-2 min-w-[430px] min-h-96 shadow-lg h-full w-full text-white bg-black rounded-md   border border-gray-900 z-50 dark:text-white overflow-scroll overflow-x-hidden">
                  <RecentChats userId={id} />
                </div>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="mr-5 w-12 rounded-2xl h-11">
            <ThemeSwitcher />
          </div>

          <div className="dropdown dropdown-end flex gap-5">
            <div className="flex flex-col">
              <span className="text-2xl text-slate-500">
                {isClient ? name : ""}
              </span>
              <p className="mt-2 text-xl font-semibold text-slate-400">
                {isClient ? registrationNumber : ""}
              </p>
            </div>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={isClient ? dp : ""}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-slate-200"
            >
              <li>
                <Link href="/myprofile" className="justify-between">
                  Profile <span className="badge">New</span>
                </Link>
              </li>

              <li>
                <button onClick={onLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-grow">
        <div className=" hidden w-full bg-gray-300 dark:bg-slate-900 lg:w-1/4 lg:block  ">
          <UserList
            onSelectUser={setSelectedUser}
            selectedUser={selectedUser}
          />
        </div>

        <div className="lg:w-3/4 w-full flex-grow p-4 dark:bg-slate-500">
          {activeContent === "profile" && selectedUser ? (
            <Lapuinfo registrationNumber={selectedUser.registrationNumber} />
          ) : activeContent === "posts" ? (
            <div className="text-center text-gray-600 dark:text-gray-200">
              <Posts />
            </div>
          ) : activeContent === "status" ? (
            <div className="text-center text-gray-600 dark:text-gray-200">
              <Subjectt />
            </div>
          ) : activeContent === "leader" ? (
            <div className="text-center text-gray-600 dark:text-gray-200">
              <Leaderboard />
            </div>
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-200">
              Select a user to view their profile, click on Posts to view posts,
              or check the status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
