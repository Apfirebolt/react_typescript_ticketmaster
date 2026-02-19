export interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  isOnline?: boolean;
  lastSeen?: string;
}

export interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  created_at: string;
  is_read: number;
}

export interface Chat {
  id: number;
  participant_1: User;
  participant_2: User;
  created_at: string;
  updated_at: string;
  last_message?: {
    id: number;
    conversation_id: number;
    sender_id: number;
    content: string;
    created_at: string;
    is_read: number;
  };
}

export interface ChatState {
  users: User[];
  chats: Chat[];
  activeChat: Chat | null;
  messages: Message[];
  loading: boolean;
  error: string | null;
}

export interface SendMessagePayload {
  content: string;
  receiver_id: number;
}

export interface CreateChatPayload {
  participant_id: number;
}