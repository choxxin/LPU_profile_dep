import React from "react";
import { BsSend } from "react-icons/bs";

// import buttonsound from "../../assets/Sound/Income.mp3";

import { useState } from "react";
import useSendComment from "@/hooks/useSendComment";
const CommentInput = ({ postId }) => {
  const [message, setmessage] = useState("");
  const { Loading, sendMessage } = useSendComment(postId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    const sound = new Audio("/assets/Sound/Income.mp3");
    sound.play();
    await sendMessage(message);
    setmessage("");
  };
  return (
    <form className="px-4 my-3">
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
          placeholder="Make a comment"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
          onClick={handleSubmit}
        >
          {Loading ? (
            <span className="loading loading-infinity loading-md"></span>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};
export default CommentInput;
