import React, { useState } from "react";
import useConversation from "../zustand/useconservation";
import toast from "react-hot-toast";
import useUserStore from "@/store/useUserStore";

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { id } = useUserStore();

  const sendMessage = async (message) => {
    setLoading(true);

    try {
      const response = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ senderId: id, message }),
        }
      );

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
}

export default useSendMessage;
