import React, { useState } from "react";
import useConversation from "../zustand/useconservation";
import toast from "react-hot-toast";
import useUserStore from "@/store/useUserStore";

function useSendComment(postId) {
  const [loading, setLoading] = useState(false);

  const { id, name, dp } = useUserStore();

  const sendMessage = async (message) => {
    setLoading(true);

    try {
      const response = await fetch(`/api/comment/new/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          comment: message,
          userDp: dp,
          userName: name,
        }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Comment posted successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
}

export default useSendComment;
