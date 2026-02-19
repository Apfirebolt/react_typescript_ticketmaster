import React, { useState, useEffect } from "react";
import useChatStore from "@/stores/chat.ts";
import useAuthStore from "@/stores/auth.ts";
import UserList from "@/components/UserList.tsx";
import ChatList from "@/components/ChatList.tsx";
import ChatWindow from "@/components/ChatWindow.tsx";
import MessageInput from "@/components/MessageInput.tsx";
import type { User } from "@/types/Chat.ts";
import { FaComments, FaUsers, FaArrowLeft } from "react-icons/fa";

const Chat: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"chats" | "users">("chats");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  
  const { activeChat, startChat } = useChatStore();
  const { user: currentUser } = useAuthStore();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowSidebar(true);
      } else {
        setShowSidebar(!activeChat);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, [activeChat]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!currentUser) {
      window.location.href = "/login";
    }
  }, [currentUser]);

  const handleStartChat = async (user: User) => {
    setSelectedUser(user);
    await startChat(user.id);
    
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleBackToSidebar = () => {
    setShowSidebar(true);
    setSelectedUser(null);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Authentication Required</h2>
          <p className="text-gray-500">Please log in to access the chat.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-primary-300 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaComments className="text-xl" />
                <h1 className="text-xl font-semibold">Chat Application</h1>
              </div>
              
              {isMobile && !showSidebar && (
                <button
                  onClick={handleBackToSidebar}
                  className="p-2 hover:bg-primary-400 rounded transition-colors"
                >
                  <FaArrowLeft />
                </button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex h-96 md:h-[600px]">
            {/* Sidebar */}
            {(!isMobile || showSidebar) && (
              <div className="w-full md:w-80 border-r border-gray-200 bg-gray-50 flex flex-col">
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab("chats")}
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                      activeTab === "chats"
                        ? "bg-white text-primary-600 border-b-2 border-primary-300"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    <FaComments className="inline mr-2" />
                    My Chats
                  </button>
                  <button
                    onClick={() => setActiveTab("users")}
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                      activeTab === "users"
                        ? "bg-white text-primary-600 border-b-2 border-primary-300"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    <FaUsers className="inline mr-2" />
                    All Users
                  </button>
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto p-4">
                  {activeTab === "chats" ? (
                    <ChatList />
                  ) : (
                    <UserList onStartChat={handleStartChat} />
                  )}
                </div>
              </div>
            )}

            {/* Chat Area */}
            {(!isMobile || !showSidebar) && (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-hidden">
                  <ChatWindow />
                </div>
                <MessageInput selectedUser={selectedUser} />
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">How to use:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Switch between "My Chats" to see existing conversations</li>
            <li>• Use "All Users" tab to start new conversations</li>
            <li>• Click on any user (except yourself) to start chatting</li>
            <li>• Press Enter to send messages, Shift+Enter for new lines</li>
            <li>• On mobile, use the back arrow to return to the user list</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Chat;