import { useState, useEffect } from "react";
import axios from "axios";

const RecentChats = ({ userId }) => {
  const [recentChats, setRecentChats] = useState([]);

  useEffect(() => {
    // Fetch recent chats on component mount
    const fetchRecentChats = async () => {
      try {
        const response = await axios.get(`/api/messages/recent/${userId}`);
        setRecentChats(response.data);
      } catch (error) {
        console.error("Failed to fetch recent chats:", error);
      }
    };

    fetchRecentChats();
  }, [userId]);

  return (
    <div className="recent-chats p-5 rounded-lg shadow-md text-white">
      <h2 className="text-2xl font-bold   mb-4 text-white">Notification</h2>
      <ul className="space-y-4  ">
        {recentChats.map((chat, index) => (
          <div key={index} className="chat-item flex  space-x-4  ">
            <img
              src={chat.senderId.profile_image}
              alt={`${chat.senderId.name}'s avatar`}
              className="w-20 h-20 rounded-full"
            />
            <span className="text-lg font-semibold">{chat.senderId.name}</span>
            {/* Red dot indicator for unread messages */}
            {!chat.isSeen && (
              <span className="ml-auto w-3 h-3 rounded-full bg-red-500"></span>
            )}
            <span>texted you</span>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default RecentChats;
