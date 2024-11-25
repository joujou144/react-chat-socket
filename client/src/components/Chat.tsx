import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SocketContext } from "../context/SocketContext";

function Chat() {
  const { messages, users, sendMessage, setTypingStatus } =
    useContext(SocketContext);

  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(messageInput);
    setMessageInput("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
    const isTyping = e.target.value.length > 0;
    setTypingStatus(isTyping);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, users]);

  return (
    <div className="container flex flex-col gap-4">
      {/* To display when a user is typing */}
      <div className="text-blue-300 h-[1rem] text-sm">
        {users.some((user) => user.isTyping) && (
          <p className="text-blue-300">
            {users
              .filter((user) => user.isTyping)
              .map((user) => `${user.id} is typing...`)}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4 border-[1px] border-[#4c4b4b] px-4 py-3 rounded-lg">
        <div>
          {users.length > 0 &&
            users.map((user) => (
              <p key={user.id}>{`${user.id} is connected`}</p>
            ))}
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 self-start">
          {messages.length > 0 &&
            messages.map(({ text, userId }, index) => (
              <p
                key={index}
                className="bg-[#4c4b4b] px-3 py-1 rounded-md"
              >{`${userId}: ${text}`}</p>
            ))}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-4 justify-between text-[#2c2929]"
      >
        <input
          type="text"
          value={messageInput}
          onChange={handleInputChange}
          placeholder="Type a message"
          className="w-full rounded-lg px-3 focus:outline focus:outline-1 focus:outline-[#eae7e7]"
        />
        <button
          type="submit"
          className="cursor-pointer bg-[#65d465]  px-3 py-2 rounded-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
