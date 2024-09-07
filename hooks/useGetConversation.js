import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
const useGetConversation = () => {
  const [Loading, setLoading] = useState(false);
  const [conversations, setconversation] = useState([]);
  //bcz we need to run only once

  useEffect(() => {
    const getconversation = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setconversation(data);
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    getconversation();
  }, []);

  return { Loading, conversations };
};

export default useGetConversation;
