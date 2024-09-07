import React from "react";

const UserProfile = ({ name, avatarUrl, regNo, selected }) => {
  return (
    <div
      className={` cursor-pointer flex items-center p-4 shadow min-w-52 min-h-16 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm border hover:bg-sky-500 dark:hover:bg-slate-800 ${
        selected
          ? "bg-blue-500 text-white"
          : "bg-gray-400 bg-opacity-20 border-gray-100"
      }`}
    >
      <img
        src={avatarUrl}
        alt={`${name}'s avatar`}
        className="w-16 h-16 rounded-full"
      />
      <div className="ml-4">
        <h2 className="text-xl dark:text-white   font-semibold">{name}</h2>
        <p className="text-gray-5 00 dark:text-white text-gray-600">{regNo}</p>
      </div>
    </div>
  );
};

export default UserProfile;
