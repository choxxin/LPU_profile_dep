import React, { useEffect, useState } from "react";
import useConversation from "../zustamd/useConversations";
import toast from "react-hot-toast";

function usedeletemessage() {
  const { deletechat, selectedConversation } = useConversation();
  const [Spinner, setSpinner] = useState(false);
  const deletemessage = async () => {
    let text;
    if (confirm("Are you sure") == true) {
      text = true;
    } else {
      text = false;
    }

    if (text === false) {
      return;
    }
    setSpinner(true);
    try {
      const res = await fetch(
        `/api/messages/delete/${selectedConversation._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      if (data) {
        toast.success(data.message);
        deletechat();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSpinner(false);
    }
  };

  return { Spinner, deletemessage };
}

export default usedeletemessage;
