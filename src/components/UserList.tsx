import React, { useEffect } from "react";
import useChatStore from "@/stores/chat.ts";
import useAuthStore from "@/stores/auth.ts";
import type { User } from "@/types/Chat.ts";
import { FaUser, FaCircle } from "react-icons/fa";

interface UserListProps {
  onStartChat: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ onStartChat }) => {
  const { users, loading, error, fetchUsers } = useChatStore();
  const { user: currentUser } = useAuthStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-300"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        <p>Error loading users: {error}</p>
        <button
          onClick={() => fetchUsers()}
          className="mt-2 px-4 py-2 bg-primary-300 text-white rounded hover:bg-primary-400 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const filteredUsers = users.filter(user => user.id !== currentUser?.id);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Available Users</h2>
      
      {filteredUsers.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No other users available</p>
      ) : (
        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => onStartChat(user)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary-300 flex items-center justify-center">
                      <FaUser className="text-white text-sm" />
                    </div>
                  )}
                  {user.isOnline && (
                    <FaCircle className="absolute -bottom-1 -right-1 text-green-500 text-xs" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 truncate">{user.username}</h3>
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  {!user.isOnline && user.lastSeen && (
                  <p className="text-xs text-gray-400">
                    Last seen: {new Date(user.lastSeen).toLocaleString()}
                  </p>
                  )}
                </div>
              </div>
              
              <button className="px-3 py-1 bg-primary-300 text-white text-sm rounded hover:bg-primary-400 transition-colors">
                Chat
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;