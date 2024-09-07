import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
// import useListenMessages from "../../../hooks/uselistenmessage";
export default function Messages() {
  const { messages, Loading } = useGetMessages();

  console.log(messages);

  // useListenMessages();

  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  //To scroll to last
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!Loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            ({<Message message={message} />})
          </div>
        ))}

      {Loading && (
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      )}

      {!Loading && messages.length === 0 && (
        <p className="text-center text-gray-800">
          Send a meassage to start conversation !
        </p>
      )}
    </div>
  );
}
