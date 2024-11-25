import { createContext } from "react";
import { Socket } from "socket.io-client";
import { Message, User } from "../types";

type SocketContextState = {
  socket: typeof Socket | null;
  messages: Message[];
  users: User[];
  isConnected: boolean;
  sendMessage: (message: string) => void;
  setTypingStatus: (isTyping: boolean) => void;
};

export const SocketContext = createContext<SocketContextState>({
  socket: null,
  messages: [],
  users: [],
  isConnected: false,
  sendMessage: () => {},
  setTypingStatus: () => {},
});
