import { create } from "zustand";

const useComment = create((set) => ({
  comments: [],
  setComments: (messages) => set({ messages }),
}));

export default useComment;
// . Zustand is a small, fast state management library. Here's what each part does:

// create: Imported from Zustand to create the store.
// useConversation: The custom hook created to manage the conversation state.
// selectedConversation: Holds the currently selected conversation.
// setSelectedConversation: A function to update the selected conversation.
// messages: An array to store messages of the selected conversation.
// setMessages: A function to update the messages.
// This store can be used to manage and access conversation-related state across your React components.
