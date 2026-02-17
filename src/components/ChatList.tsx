import React, { useEffect } from "react";
import useChatStore from "@/stores/chat.ts";
import useAuthStore from "@/stores/auth.ts";
import type { Chat } from "@/types/Chat.ts";
import { FaUser, FaCircle } from "react-icons/fa";

const ChatList: React.FC = () => {
  const { chats, loading, error, fetchChats, selectChat, activeChat, users } = useChatStore();
  const { user: currentUser } = useAuthStore();

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-300"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        <p>Error loading chats: {error}</p>
        <button
          onClick={() => fetchChats()}
          className="mt-2 px-4 py-2 bg-primary-300 text-white rounded hover:bg-primary-400 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Your Chats</h2>
      
      {chats.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No chats yet</p>
      ) : (
        <div className="space-y-2">
          {chats.map((chat: Chat) => {
            // Get the other participant from the chat
            const otherUser = chat.participant_1.id === currentUser?.id 
              ? chat.participant_2 
              : chat.participant_1;
            
            const isActive = activeChat?.id === chat.id;
            
            return (
              <div
                key={chat.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  isActive
                    ? "bg-primary-100 border-l-4 border-primary-300"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
                onClick={() => selectChat(chat)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    {otherUser?.avatar ? (
                      <img
                        src={otherUser.avatar}
                        alt={otherUser.username}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary-300 flex items-center justify-center">
                        <FaUser className="text-white text-sm" />
                      </div>
                    )}
                    {otherUser?.isOnline && (
                      <FaCircle className="absolute -bottom-1 -right-1 text-green-500 text-xs" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-800 truncate">
                        {otherUser?.username || "Unknown User"}
                      </h3>
                      {chat.last_message && chat.last_message.is_read === 0 && chat.last_message.sender_id !== currentUser?.id && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-5 text-center">
                          1
                        </span>
                      )}
                    </div>
                    
                    {chat.last_message && (
                      <p className="text-sm text-gray-500 truncate">
                        {chat.last_message.sender_id === currentUser?.id ? "You: " : ""}
                        {chat.last_message.content}
                      </p>
                    )}
                    
                    <p className="text-xs text-gray-400">
                      {new Date(chat.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChatList;