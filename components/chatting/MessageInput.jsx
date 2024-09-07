import React from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

import { useState } from "react";
const MessageInput = () => {
  const [message, setmessage] = useState("");
  const { Loading, sendMessage } = useSendMessage();
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
          placeholder="Send a message"
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
export default MessageInput;
