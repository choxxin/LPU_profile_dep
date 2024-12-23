"use client";
import { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

import CourseList from "./courseList";

import Leetcode from "./leetcode";
import NOLeetcode from "./noleetcode";
import { LuGithub } from "react-icons/lu";
import { handleleetcodeprofile } from "@/app/api/umsinfo";

import toast from "react-hot-toast";
import useUserStore from "@/store/useUserStore";

import Drawercomp from "./Drawercomp";
import ExamList from "./Exams/Examss";
const Lapuinfo = ({ registrationNumber, user_id }) => {
  const { themetop } = useUserStore();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState(false);
  const [leetcodeProfile, setLeetcodeProfile] = useState(null);
  const [hide, sethide] = useState(false);

  const [course, setcourse] = useState(null);
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      // const data = await getProfileByRegistrationNumber(registrationNumber);
      const response = await fetch("/api/getprofilebyregno", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reg_no: registrationNumber }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      const data = await response.json();

      // const courses = await GetCourses(registrationNumber);
      const response2 = await fetch("/api/getcourse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reg_no: registrationNumber }),
      });

      const courses = await response2.json();
      setcourse(courses);

      setProfileData(data);
      sethide(data.user?.hide);
      console.log(data.user.leetcode_username);
      if (data.user.leetcode_username) {
        const leetData = await handleleetcodeprofile(
          data.user.leetcode_username
        );
        setLeetcodeProfile(leetData);
      } else {
        setLeetcodeProfile(null);
      }
    } catch (err) {
      setError(err.message);
      toast.error("Failed to fetch profile data", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (registrationNumber) {
      fetchProfileData();
    }
  }, [registrationNumber]);

  const handleProfileSaved = () => {
    fetchProfileData(); // Refresh profile data
  };
  const changeleetprofile = () => {
    setLeetcodeProfile(null);
  };
  if (loading)
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-ring   h-60 font-bold  loading-lg"></span>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {profileData ? (
        <div
          className={`min-h-32 w-full bg-gray-300   
              
            // profileData.user.themetop || "gradient-profile"

         
          `}
        >
          <div className="  gap-5 flex flex-col lg:flex-row ">
            <div className="avatar mt-5 ml-5">
              <div className="mask mask-squircle w-44">
                <img src={profileData.user.profile_image} />
              </div>
            </div>

            <div className="text-5xl text-bold  mt-5 dark:text-white font-bold gblack">
              <p>{profileData.user.name}</p>
              {profileData.user.linkedin &&
              profileData.user.linkedin.trim() !== "" ? (
                <a
                  href={profileData.user.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-lg mt-2 block"
                >
                  <FaLinkedinIn className="w-7 h-7" />
                </a>
              ) : (
                <div className="text-red-500 text-lg mt-2"></div>
              )}
              {profileData.user.github &&
              profileData.user.github.trim() !== "" ? (
                <a
                  href={profileData.user.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-lg mt-2 block"
                >
                  <LuGithub className="w-7 h-7 text-black" />
                </a>
              ) : (
                <div className="text-red-500 text-lg mt-2"></div>
              )}
              {profileData.user.instagram &&
              profileData.user.instagram.trim() !== "" ? (
                <a
                  href={profileData.user.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-lg mt-2 block"
                >
                  <FaInstagram className="w-7 h-7 text-pink-500" />
                </a>
              ) : (
                <div className="text-red-500 text-lg mt-2"></div>
              )}
            </div>
            <div className="text-xl mt-7 text-semibold text-black font-semibold">
              <p>Reg No:{profileData.user.registrationNumber}</p>
            </div>
            <div className="flex justify-center  h-14">
              <Drawercomp />
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-6 lg:flex-row">
            {hide ? (
              <div
                className="radial-progress text-blue-400 text-2xl ml-5 "
                style={{
                  "--value": 100,
                  "--size": "12rem",
                  "--thickness": "0.5rem",
                }}
              >
                <p>Hidden</p>
              </div>
            ) : (
              <div
                className="radial-progress text-blue-600 text-2xl ml-5 "
                style={{
                  "--value": (profileData.cgpa / 10) * 100,
                  "--size": "12rem",
                  "--thickness": "1.5rem",
                }}
                role="progressbar"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                {hover
                  ? `${((profileData.cgpa / 10) * 100).toFixed(1)}%`
                  : `CGPA: ${profileData.cgpa}`}
              </div>
            )}
            <div>
              <div className="text-3xl font-bold mt-3 font-mono text-gray-600 dark:text-sky-400 gsec">
                <p>Section: {profileData.section}</p>
              </div>
              <div className="mt-8 font-semibold gblack text-lg">
                <p>Program: {profileData.program}</p>

                <p>Roll Number: {profileData.roll_number}</p>
                <p>Aggregate Attendance: {profileData.agg_attendance}%</p>
              </div>
            </div>
          </div>
          <div>{/* Add more fields as needed */}</div>
          <div>
            {leetcodeProfile ? (
              <Leetcode
                leetcode={leetcodeProfile}
                switchprofile={changeleetprofile}
                username={profileData.user.leetcode_username}
                reg_no={profileData.user.registrationNumber}
                themedow={profileData.user.themedown}
              />
            ) : (
              <NOLeetcode
                reg_no={registrationNumber}
                onProfileSaved={handleProfileSaved}
                name={profileData.user.name}
              />
            )}
          </div>
          <div>
            <CourseList courses={course} />
          </div>
          <div>
            <ExamList reg_no={profileData.user.registrationNumber} />
          </div>
        </div>
      ) : (
        <div className="min-h-32 w-full border-2 border-black">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      )}
    </>
  );
};

export default Lapuinfo;
