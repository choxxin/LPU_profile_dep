"use client";
import { changethemeup } from "@/app/api/umsinfo";
import { FaLinkedinIn } from "react-icons/fa";
import useUserStore from "@/store/useUserStore";
import { TbArrowsExchange } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import Subjectt from "@/components/graph/Subattendence";
import { LuGithub } from "react-icons/lu";
import useAuthRedirect from "@/utils/useAuthredirect";
import { FaAddressBook } from "react-icons/fa";
import {
  getProfileByRegistrationNumber,
  updateUserAvatar,
} from "@/app/api/umsinfo";
import Leetcode from "../../components/leetcode";
import { useRouter } from "next/navigation";
import NOLeetcode from "../../components/noleetcode";
import { handleleetcodeprofile, deleteUserAndProfile } from "@/app/api/umsinfo";
import toast from "react-hot-toast";
import LinkedinDrawer from "@/components/LinkedinDrawer";
import ToggleHideButton from "@/components/Toogle/Togglebutton";

const MyProfile = () => {
  useAuthRedirect();
  const router = useRouter();
  const [defaultbutton, setdefaultbutton] = useState(false);

  const { registrationNumber, dp, setdp, setThemetop, themetop } =
    useUserStore();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hover, setHover] = useState(false);
  const [leetcodeProfile, setLeetcodeProfile] = useState(null);
  // const [leetcodeusername, setleetcodeusername] = useState(null);
  const [avatar, setavatar] = useState(dp);
  const [Inputs, setInputs] = useState({
    avatar: avatar,
  });
  const [Loadingg, setLoadingg] = useState(false);
  const [ImageLoad, setImageLoad] = useState(true);
  const [color, SetColor] = useState(themetop);
  const [hide, sethide] = useState(false);
  const changeanime = async (e) => {
    e.preventDefault();
    setdefaultbutton(true);
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
      setInputs({ ...Inputs, avatar: data.url });
    } catch (error) {
      console.error("Error fetching image:", error);
      setLoadingg(false);
    }
  };
  useEffect(() => {
    const themechange = async () => {
      try {
        const response = await changethemeup(registrationNumber, color);
        if (response) {
        } else {
          toast.error("Failed to change theme");
        }
        // Optionally, update local storage or state
        setThemetop(color);
        toast.success("Theme changed successfully leetcode");
      } catch (error) {
        toast.error("Failed to change theme leetcode");
      }
    };

    if (registrationNumber) {
      themechange();
    }
  }, [color]);

  const changeavatar = async () => {
    try {
      await updateUserAvatar(registrationNumber, Inputs.avatar);
      setdp(Inputs.avatar);
      toast.success("Avatar updated successfully");
      router.push("/");
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast.error("Failed to update avatar");
    }
  };

  const Loadhandler = () => {
    setImageLoad(true);
  };

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const data = await getProfileByRegistrationNumber(registrationNumber);
      setProfileData(data);
      SetColor(data.user.themetop);
      sethide(data.user.hide);
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

  const DeleteHandler = async () => {
    //alert
    if (window.confirm("Are you sure you want to delete your profile?")) {
      if (window.confirm("This process is irreversible. Are you sure?")) {
        DeleteUser();
      }
    }
  };
  const DeleteUser = async () => {
    //alert

    try {
      const response = await deleteUserAndProfile(registrationNumber);

      if (response) {
        toast.success("User deleted successfully");
        router.push("/login"); // Redirect to home or login page after logout
      } else {
        toast.error("Error deleting user");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error logging out");
    }
  };

  //For fetching leetcode api
  // useEffect(() => {
  //   // Fetch the user data on mount
  //   const fetchUser = async () => {
  //     try {
  //       if (profileData.leetcode_username) {
  //         const Leetdata = await handleleetcodeprofile(
  //           profileData.leetcode_profile
  //         );
  //         setLeetcodeProfile(Leetdata);
  //         setleetcodeusername(profileData.leetcode_username);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching user data:", err);
  //       setError("Failed to fetch user data.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);
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
        <div className={`min-h-32 w-full   ${color} `}>
          <div className="flex flex-col lg:flex-row gap-5 ml-5">
            <div className="avatar  ">
              <div className="mask mask-squircle w-44">
                <img src={Inputs.avatar} onLoad={Loadhandler} />
              </div>
            </div>

            <div className="text-5xl font-bold text-gray-800   ">
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
                <div className="text-red-500 text-lg mt-2">
                  LinkedIn profile not provided
                </div>
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
                <div className="text-red-500 text-lg mt-2">
                  Github profile not provided
                </div>
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
                <div className="text-red-500 text-lg mt-2">
                  Instagram profile not provided
                </div>
              )}
            </div>

            <div className="text-xl mt-7 text-semibold text-gray-600 ">
              <p>Reg No:{profileData.user.registrationNumber}</p>
              <LinkedinDrawer
                senderId={profileData.user._id}
                linkedin={profileData.user.linkedin}
                instagram={profileData.user.instagram}
                github={profileData.user.github}
              />
            </div>
            <div className=" ">
              <button
                className="btn btn-ghost ml-7 text-gray-800  mt-7 h-20 bg-pink-200"
                onClick={changeanime}
                disabled={Loadingg}
              >
                {!Loadingg && ImageLoad ? (
                  <div>
                    {" "}
                    <TbArrowsExchange className="h-10 w-10" />
                    <p>Change Avatar</p>
                  </div>
                ) : (
                  <span className="loading loading-spinner"></span>
                )}
              </button>
              <button
                className={`btn btn-ghost ml-7 text-gray-800 border-2 border-gray-300 mt-7 h-20 ${
                  defaultbutton ? "bg-green-200" : "bg-red-400"
                }`}
                onClick={changeavatar}
                disabled={Loadingg}
              >
                {!Loadingg && ImageLoad ? (
                  <div>
                    {" "}
                    <FaCheck className="h-10 w-10" />
                    <p>Ok</p>
                  </div>
                ) : (
                  <span className="loading loading-spinner"></span>
                )}
              </button>
            </div>
            <div className="  h-16 gap-7 justify-center min-w-52 flex items-center mt-7 ml-3  ">
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
          </div>
          <div className="flex flex-col gap-5 mt-6 ml-5 lg:flex-row">
            {hide ? (
              <div
                className="radial-progress text-pink-400 text-2xl ml-5 cgpa"
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
                className="radial-progress text-pink-400 text-2xl ml-5 cgpa"
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
              <div className="text-3xl font-bold mt-3 font-mono gsec">
                <p>Section: {profileData.section}</p>
              </div>
              <div className="mt-8 font-semibold ">
                <p>Program: {profileData.program}</p>

                <p>Roll Number: {profileData.roll_number}</p>
                <p>Aggregate Attendance: {profileData.agg_attendance}%</p>
              </div>
            </div>
            <div>
              <ToggleHideButton isHidden={hide} setIsHidden={sethide} />
            </div>
            <div className="sm:ml-9">
              <p> DELETE PROFILE</p>
              <AiFillDelete
                onClick={DeleteHandler}
                className="w-10 h-10 text-red-800 hover:text-red-600"
              />
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
              />
            ) : (
              <NOLeetcode
                reg_no={registrationNumber}
                onProfileSaved={handleProfileSaved}
                name={profileData.user.name}
              />
            )}
          </div>
          <div className="ml-10">
            <Subjectt />
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

export default MyProfile;
