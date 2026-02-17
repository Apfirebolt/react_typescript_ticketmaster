import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "@/lib/utils.ts";
import type { User, Chat, Message, ChatState, SendMessagePayload } from "@/types/Chat.ts";

interface ChatStore extends ChatState {
  fetchUsers: () => Promise<void>;
  fetchChats: () => Promise<void>;
  sendMessage: (payload: SendMessagePayload) => Promise<void>;
  selectChat: (chat: Chat | null) => void;
  fetchMessages: (chatId: number) => Promise<void>;
  markAsRead: (messageId: number) => Promise<void>;
  setActiveChat: (chat: Chat | null) => void;
  startChat: (userId: number) => Promise<void>;
}

const useChatStore = create<ChatStore>((set, get) => ({
  users: [],
  chats: [],
  activeChat: null,
  messages: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get("http://localhost:8000/api/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        set({ users: response.data, loading: false });
      }
    } catch (error: any) {
      console.error("Error fetching users:", error);
      set({ error: error.message || "Failed to fetch users", loading: false });
      toast.error("Failed to fetch users", toastOptions);
    }
  },

  fetchChats: async () => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get("http://localhost:8000/api/chat/conversations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        set({ chats: response.data, loading: false });
      }
    } catch (error: any) {
      console.error("Error fetching chats:", error);
      set({ error: error.message || "Failed to fetch chats", loading: false });
      toast.error("Failed to fetch chats", toastOptions);
    }
  },

  sendMessage: async (payload: SendMessagePayload) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.post("http://localhost:8000/api/chat/send", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        // Refresh messages after sending
        const { activeChat } = get();
        if (activeChat) {
          await get().fetchMessages(activeChat.id);
        }
        toast.success("Message sent successfully", toastOptions);
      }
    } catch (error: any) {
      console.error("Error sending message:", error);
      set({ error: error.message || "Failed to send message", loading: false });
      toast.error("Failed to send message", toastOptions);
    } finally {
      set({ loading: false });
    }
  },

  fetchMessages: async (chatId: number) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(`http://localhost:8000/api/chat/conversations/${chatId}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        set({ messages: response.data, loading: false });
      }
    } catch (error: any) {
      console.error("Error fetching messages:", error);
      set({ error: error.message || "Failed to fetch messages", loading: false });
      toast.error("Failed to fetch messages", toastOptions);
    }
  },

  selectChat: (chat: Chat | null) => {
    set({ activeChat: chat });
    if (chat) {
      get().fetchMessages(chat.id);
    } else {
      set({ messages: [] });
    }
  },

  setActiveChat: (chat: Chat | null) => {
    set({ activeChat: chat });
  },

  startChat: async (userId: number) => {
    try {
      set({ loading: true, error: null });
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.post("http://localhost:8000/api/chat/conversations", 
        { participant_id: userId }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const newChat = response.data;
        const { chats } = get();
        set({ 
          chats: [...chats, newChat], 
          activeChat: newChat,
          loading: false 
        });
        toast.success("Chat started successfully", toastOptions);
        return newChat;
      }
    } catch (error: any) {
      console.error("Error starting chat:", error);
      set({ error: error.message || "Failed to start chat", loading: false });
      toast.error("Failed to start chat", toastOptions);
    }
  },

  markAsRead: async (messageId: number) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.put(`http://localhost:8000/api/messages/${messageId}/read`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update local state
      const { messages } = get();
      const updatedMessages = messages.map(msg => 
        msg.id === messageId ? { ...msg, isRead: true } : msg
      );
      set({ messages: updatedMessages });
    } catch (error: any) {
      console.error("Error marking message as read:", error);
    }
  },
}));

export default useChatStore;