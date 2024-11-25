import { Socket } from "socket.io-client";
import { Message, User } from "../types";
import { createContext, ReactNode, useEffect, useState } from "react";
import io from "socket.io-client";

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

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<typeof Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io.connect("http://localhost:3500");

    newSocket.on("connect", () => {
      setIsConnected(true);
    });

    newSocket.on("message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on("userConnected", (userId: string) => {
      setUsers((prev) => {
        if (!prev.some((user) => user.id === userId)) {
          return [...prev, { id: userId, isTyping: false }];
        }

        return prev;
      });
    });

    newSocket.on(
      "activity",
      ({ userId, isTyping }: { userId: string; isTyping: boolean }) => {
        setUsers((prev) => {
          const updatedUsers = prev.map((user) => {
            return user.id === userId ? { ...user, isTyping } : user;
          });

          return updatedUsers;
        });
      }
    );

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = (text: string) => {
    if (socket) {
      const message: Message = {
        text,
        userId: socket.id.substring(0, 5),
      };
      socket.emit("message", message);
    }
  };

  const setTypingStatus = (isTyping: boolean) => {
    if (socket) {
      socket.emit("activity", {
        userId: socket.id.substring(0, 5),
        isTyping,
      });

      // Stop typing after 3 seconds
      if (isTyping) {
        setTimeout(() => {
          socket.emit("activity", {
            userId: socket.id.substring(0, 5),
            isTyping: false,
          });
        }, 3000);
      }
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        messages,
        users,
        isConnected,
        sendMessage,
        setTypingStatus,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
