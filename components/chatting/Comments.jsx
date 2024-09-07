import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetComments from "@/hooks/useGetComments";
import Com from "./Com";

export default function Comments({ postId }) {
  const { messages, loading } = useGetComments(postId);
  const lastMessageRef = useRef();

  console.log("Messages:", messages);
  console.log("Post ID:", postId);

  useEffect(() => {
    if (messages && messages.comments && messages.comments.length > 0) {
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages]);

  return (
    <div className="px-4 flex-1  max-h-[400px] overflow-scroll">
      {loading && (
        <div className="flex w-52 flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      )}

      {!loading &&
        messages &&
        messages.comments &&
        messages.comments.length > 0 &&
        messages.comments.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Com message={message} />
          </div>
        ))}

      {!loading &&
        messages &&
        (!messages.comments || messages.comments.length === 0) && (
          <div className="mockup-window bg-base-300 border ">
            <div className="bg-base-200 flex justify-center px-4 py-16">
              OOps! No comment found
            </div>
          </div>
        )}
    </div>
  );
}
