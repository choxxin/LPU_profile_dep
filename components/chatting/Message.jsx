import React from "react";
import useConversation from "@/zustand/useconservation";
import useUserStore from "@/store/useUserStore";
// import { useAuthContext } from "../../../context/Authcontext";
import { extractTime } from "../../utils/extractTime";
// import LongMessage from "../../../utils/largerstring";
function Message({ message }) {
  const { id, name, dp } = useUserStore();
  // const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const mytime = extractTime(message.createdAt);

  const fromme = message.senderId === id || message.senderId._id === id;
  const sender = fromme ? "You" : selectedConversation.name;
  // const sender = fromme
  // const sender = "meow";
  // ? "You"
  // : selectedConversation.fullName ||
  //   message.senderId.fullName ||
  //   message.fullName;
  // console.log("meow", message.senderId.avatar);
  const chatclassname = fromme ? "chat-end" : "chart-start";
  const avatar = fromme ? dp : selectedConversation.profile_image;
  const bubblecolor = fromme ? "bg-sky-500" : "bg-gray-700";
  const textcolor = fromme ? "text-gray-800" : "text-gray-200";
  const shakeclass = message.shouldShake ? "shake" : "";
  // console.log(avatar);
  console.log(message.message);
  {
    /* <LongMessage message={message.message} charsPerSegment={20} />
     */
  }
  return (
    <div className={`chat ${chatclassname}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={`${avatar}`} />
        </div>
      </div>
      <div className="chat-header text-white mt-4">{sender}</div>
      <div className={`chat-bubble ${bubblecolor} ${textcolor} ${shakeclass}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-gray-900">{mytime}</div>
    </div>
  );
}

export default Message;
