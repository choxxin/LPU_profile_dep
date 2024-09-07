import React, { useEffect, useState } from "react";
import axios from "axios";
import UserProfile from "./sidebar";
import useConversation from "@/zustand/useconservation";
import { FaSearchengin } from "react-icons/fa6";

const UserList = ({ onSelectUser, selectedUser }) => {
  const { setSelectedConversation, setSelectedConversationdp } =
    useConversation();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const [Loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/getalluser");
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filtered users with all users
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle search on the frontend
  useEffect(() => {
    const regex = new RegExp(searchTerm, "i"); // Create a regex for case-insensitive search
    const filtered = users.filter(
      (user) => regex.test(user.name) || regex.test(user.registrationNumber)
    );

    setFilteredUsers(filtered); // Update the filtered users based on the search term
  }, [searchTerm, users]);

  return (
    <>
      {/* Search bar */}
      <div className="ml-6 mb-4 mr-9 flex gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={` Search users...`}
          className="p-2 w-full border rounded-lg dark:bg-gray-800 dark:text-white"
        />
        <FaSearchengin className="h-10 w-10 dark:text-white" />
      </div>

      {Loading ? (
        <div className="flex w-72 min-h-52 flex-col gap-4 ml-10">
          <div className="flex items-center gap-4">
            <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      ) : (
        <div className="ml-6 gap-4 sm:grid-cols-2 lg:grid-cols-3 flex flex-col bg-gray-300 w-80 min-w-52 min-h-16 overflow-scroll overflow-x-hidden dark:bg-slate-600">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => {
                onSelectUser(user);
                setSelectedConversation(user);
                setSelectedConversationdp(user.profile_image);
              }}
            >
              <UserProfile
                key={user._id}
                name={user.name}
                avatarUrl={user.profile_image}
                regNo={user.registrationNumber}
                selected={selectedUser && selectedUser._id === user._id}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserList;
