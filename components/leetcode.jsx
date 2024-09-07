"use client ";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import React from "react";
import useUserStore from "@/store/useUserStore";
import { changethemedown } from "@/app/api/umsinfo";
const Leetcode = ({ leetcode, switchprofile, username, reg_no, themedow }) => {
  const { registrationNumber, setThemedown, themedown } = useUserStore();
  const [color, SetColor] = useState(themedown);
  console.log(leetcode);
  const changeprofile = () => {
    switchprofile();
  };
  useEffect(() => {
    const themechange = async () => {
      try {
        const response = await changethemedown(registrationNumber, color);
        if (response) {
          // Success: Display a success message
        } else {
          // Failure: Handle if no response is returned
          toast.error("Failed to change theme");
        }
        // Optionally, update local storage or state
        setThemedown(color);
        toast.success("Theme changed successfully leetcode");
      } catch (error) {
        toast.error("Failed to change theme leetcode");
      }
    };

    if (registrationNumber) {
      themechange(); // Call themechange only if registrationNumber is set
    }
  }, [color]);
  return (
    <div
      className={`flex flex-col min-w-64 md:flex-row gap-10   mt-5 py-11  ${
        themedow || color
      } `}
    >
      <div className="flex flex-col gap-1 py-10 ml-5">
        <p className="text-center text-3xl gradient-blue   font-bold">
          {username}
        </p>
        <div>
          {" "}
          <p className="text-gray-300 text-xl text-bold text-center">
            Total solved:
          </p>
        </div>
        <div>
          {" "}
          <p className="text-center text-8xl     gradient-yellow  font-bold">
            {leetcode.solvedProblem}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1 items-center ">
        <p className="text-gray-300 text-xl text-bold  ">
          Easy solved: {leetcode.easySolved}
        </p>
        {/* Calculate the percentage of easy problems solved */}
        <div
          className="radial-progress gradient-green "
          style={{
            "--value": leetcode.solvedProblem
              ? (leetcode.easySolved / leetcode.solvedProblem) * 100
              : 0,
          }}
          role="progressbar "
        >
          {/* Display the percentage inside the radial progress bar */}
          {(leetcode.solvedProblem
            ? (leetcode.easySolved / leetcode.solvedProblem) * 100
            : 0
          ).toFixed(2)}
          %
        </div>
      </div>
      {/* //medium-progress */}
      <div className="flex flex-col gap-1 items-center">
        <p className="text-gray-300 text-xl text-bold">
          Medium solved: {leetcode.mediumSolved}
        </p>
        {/* Calculate the percentage of medium problems solved */}
        <div
          className="radial-progress gradient-med"
          style={{
            "--value": leetcode.solvedProblem
              ? (leetcode.mediumSolved / leetcode.solvedProblem) * 100
              : 0,
          }}
          role="progressbar"
        >
          {(leetcode.solvedProblem
            ? (leetcode.mediumSolved / leetcode.solvedProblem) * 100
            : 0
          ).toFixed(2)}
          %
        </div>
      </div>
      {/* hard */}
      <div className="flex flex-col gap-1 items-center">
        <p className="text-gray-300 text-xl text-bold  ">
          Hard solved: {leetcode.hardSolved}
        </p>

        {/* Calculate the percentage of hard problems solved */}
        <div
          className="radial-progress gradient-hard"
          style={{
            "--value": leetcode.solvedProblem
              ? (leetcode.hardSolved / leetcode.solvedProblem) * 100
              : 0,
          }}
          role="progressbar"
        >
          {(leetcode.solvedProblem
            ? (leetcode.hardSolved / leetcode.solvedProblem) * 100
            : 0
          ).toFixed(2)}
          %
        </div>
      </div>
      <div>
        {" "}
        {reg_no === registrationNumber && (
          <button onClick={changeprofile} className="btn btn-accent mt-8">
            Change Username
            <img
              src="https://leetcode.com/static/images/LeetCode_Sharing.png"
              height={80}
              width={80}
              alt=""
            />
          </button>
        )}
      </div>
      <div className="mr-5">
        {" "}
        {reg_no === registrationNumber && (
          <div className="  h-16 gap-7 justify-center min-w-52 flex items-center mt-7 ml-3">
            <div
              className={`border-2 border-white h-10 w-10 gradient-profile`}
              onClick={() => {
                SetColor("gradient-profile");
              }}
            ></div>
            <div
              className="border-2 border-white h-10 w-10 g1"
              onClick={() => {
                SetColor("g1");
              }}
            ></div>
            <div
              className="border-2 border-white h-10 w-10 gtop "
              onClick={() => {
                SetColor("gtop");
              }}
            ></div>
            <div
              className="border-2 border-white h-10 w-10 g2"
              onClick={() => {
                SetColor("g2");
              }}
            ></div>
            <div
              className="border-2 border-white h-10 w-10 g3 "
              onClick={() => {
                SetColor("g3");
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leetcode;
