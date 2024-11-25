export interface Message {
  text: string;
  userId: string;
}

export interface User {
  id: string;
  isTyping: boolean;
}
