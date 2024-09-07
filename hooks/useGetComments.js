import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useComment from "@/zustand/usecomment";
function useGetComments(postId) {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    const getMessage = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/comment/${postId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
        console.log(messages, postId);
      }
    };

    if (postId) getMessage(); // Check if postId is provided before making the request
  }, [postId]);

  return { messages, loading };
}

export default useGetComments;
