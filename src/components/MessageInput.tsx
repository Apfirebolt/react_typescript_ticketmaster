import React, { useState, KeyboardEvent } from "react";
import useChatStore from "@/stores/chat.ts";
import useAuthStore from "@/stores/auth.ts";
import type { User } from "@/types/Chat.ts";
import { FaPaperPlane } from "react-icons/fa";

interface MessageInputProps {
  selectedUser?: User | null;
}

const MessageInput: React.FC<MessageInputProps> = ({ selectedUser }) => {
  const [message, setMessage] = useState("");
  const { activeChat, sendMessage, loading } = useChatStore();
  const { user: currentUser } = useAuthStore();

  const handleSend = async () => {
    if (!message.trim()) return;

    let receiverId: number;

    if (activeChat) {
      // Get the other participant's ID from active chat
      const otherUserId = activeChat.participant_1.id === currentUser?.id 
        ? activeChat.participant_2.id 
        : activeChat.participant_1.id;
      receiverId = otherUserId;
    } else if (selectedUser) {
      // Use selected user ID
      receiverId = selectedUser.id;
    } else {
      return;
    }

    try {
      await sendMessage({
        content: message.trim(),
        receiver_id: receiverId,
      });
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isDisabled = loading || (!activeChat && !selectedUser);

  return (
    <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
      <div className="flex items-end space-x-2">
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              isDisabled
                ? "Select a user to start chatting..."
                : "Type your message... (Enter to send, Shift+Enter for new line)"
            }
            disabled={isDisabled}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
        <button
          onClick={handleSend}
          disabled={isDisabled || !message.trim()}
          className="p-3 bg-primary-300 text-white rounded-lg hover:bg-primary-400 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <FaPaperPlane className="text-sm" />
          )}
        </button>
      </div>
      
      {selectedUser && !activeChat && (
        <div className="mt-2 text-sm text-gray-600">
          Starting new conversation with <span className="font-semibold">{selectedUser.username}</span>
        </div>
      )}
    </div>
  );
};

export default MessageInput;