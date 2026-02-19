import React, { useEffect, useRef } from "react";
import useChatStore from "@/stores/chat.ts";
import useAuthStore from "@/stores/auth.ts";
import type { Message } from "@/types/Chat.ts";
import { FaUser } from "react-icons/fa";

const ChatWindow: React.FC = () => {
  const { activeChat, messages, loading, fetchMessages, users } = useChatStore();
  const { user: currentUser } = useAuthStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeChat) {
      fetchMessages(activeChat.id);
    }
  }, [activeChat, fetchMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUser className="text-gray-400 text-xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No Chat Selected</h3>
          <p className="text-gray-500">Select a user from the list to start chatting</p>
        </div>
      </div>
    );
  }

  // Get the other participant from the chat
  const otherUser = activeChat.participant_1.id === currentUser?.id 
    ? activeChat.participant_2 
    : activeChat.participant_1;

  return (
    <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-primary-300 text-white rounded-t-lg">
        <div className="flex items-center space-x-3">
          {otherUser?.avatar ? (
            <img
              src={otherUser.avatar}
              alt={otherUser.username}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
              <FaUser className="text-white text-sm" />
            </div>
          )}
          <div>
            <h3 className="font-semibold">{otherUser?.username || "Unknown User"}</h3>
            <p className="text-sm text-blue-100">
              {otherUser?.isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto max-h-96 min-h-96">
        {loading && (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-300"></div>
          </div>
        )}

        {!loading && messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No messages yet. Start the conversation!
          </div>
        )}

        <div className="space-y-4">
          {messages.map((message: Message) => {
            const isCurrentUser = message.sender_id === currentUser?.id;
            
            return (
              <div
                key={message.id}
                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    isCurrentUser
                      ? "bg-primary-300 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className={`text-xs ${
                      isCurrentUser ? "text-blue-100" : "text-gray-500"
                    }`}>
                      {new Date(message.created_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    {isCurrentUser && (
                      <span className={`text-xs ml-2 ${
                        message.is_read ? "text-blue-100" : "text-blue-200"
                      }`}>
                        {message.is_read ? "Read" : "Sent"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;