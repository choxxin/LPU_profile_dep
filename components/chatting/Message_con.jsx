" use client";
import React from "react";
import { useEffect } from "react";
import useConversation from "../../zustand/useconservation";
import { MdDelete } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import Messages from "../../components/chatting/Messages";
// import "../../../../src/index.css";

import MessageInput from "./MessageInput";
// import usedeletemessage from "../../../hooks/usedeletemessage";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  // const { Spinner, deletemessage } = usedeletemessage();
  // useEffect(() => {
  //   // cleanup function (unmounts)
  //   return () => setSelectedConversation(null);
  // }, [setSelectedConversation]);
  return (
    <div className="md:min-w-[550px] h-[500px]  flex flex-col " id="mc">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2  flex">
            <div className="flex flex-col"></div>
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">
              {
                /* {selectedConversation._id === "meow"
              ? "Everyone"
              
              : */
                selectedConversation.name
              }
            </span>
            <span className="ml-5 flex">
              {/* {!Spinner ? (
                <MdDelete
                  className="h-6 w-6 text-gray-900 hover:bg-white"
                  // onClick={deletemessage}
                />
              ) : (
                <span className="loading loading-spinner text-info"></span>
              )} */}
              {/* <span className="ml-2" onClick={deletemessage}> Delete All chat</span> */}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  // const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="mockup-phone">
        <div className="camera"></div>
        <div className="display">
          <div className="artboard artboard-demo phone-1">
            {" "}
            <div
              className="px-4 text-center sm:text-lg md:text-xl text-gray-500 
      font-semibold flex flex-col items-center gap-2"
            >
              <p id="kukur" className="text-gray-100">
                {" "}
                <div class="content">
                  <h1 class="title">
                    HELLO
                    <div class="aurora">
                      <div class="aurora__item"></div>
                      <div class="aurora__item"></div>
                      <div class="aurora__item"></div>
                      <div class="aurora__item"></div>
                    </div>
                  </h1>
                </div>{" "}
                {/* {authUser.fullName} ❄ */}
              </p>
              <p>Select a chat to start messaging</p>
              <TiMessages className="text-3xl md:text-6xl text-center text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
