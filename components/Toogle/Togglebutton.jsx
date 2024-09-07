import { useState, useEffect } from "react";
import useUserStore from "@/store/useUserStore";
import toast from "react-hot-toast";
const ToggleHideButton = ({ isHidden, setIsHidden }) => {
  //   const [isHidden, setIsHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useUserStore();

  const handleToggle = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/togglehide", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ SenderId: id }),
      });

      if (response.ok) {
        setIsHidden(!isHidden); // Toggle local state
      } else {
        console.error("Failed to update hide status:", response.statusText);
      }
      toast.success("Hide status updated successfully");
    } catch (error) {
      console.error("Error during fetch:", error);
      toast.error("Failed to update hide status");
    }

    setLoading(false);
  };

  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={isHidden}
          onChange={handleToggle}
          disabled={loading}
        />
        <div
          className={`block bg-gray-600 ${
            isHidden ? "bg-red-500" : "bg-green-500"
          } w-14 h-8 rounded-full`}
        ></div>
        <div
          className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
            isHidden ? "translate-x-full" : ""
          }`}
        ></div>
      </div>
      <span className="ml-3 text-gray-700">
        {loading ? (
          <span className="loading loading-ball loading-lg"></span>
        ) : isHidden ? (
          "Unhide CGPA"
        ) : (
          "Hide CGPA"
        )}
      </span>
    </label>
  );
};

export default ToggleHideButton;
