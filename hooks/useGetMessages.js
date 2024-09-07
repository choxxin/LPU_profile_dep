import React, { useEffect, useState } from "react";
import useConversation from "../zustand/useconservation";
import toast from "react-hot-toast";
import useUserStore from "@/store/useUserStore";
function useGetMessages() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { id } = useUserStore();
  useEffect(() => {
    const getMessage = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `/api/messages/${selectedConversation._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ senderId: id }),
          }
        );

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation) getMessage();
  }, [selectedConversation, setMessages]);

  return { messages, loading };
}

export default useGetMessages;
