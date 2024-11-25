import Chat from "./components/Chat";
import { SocketProvider } from "./context/SocketContext";

function App() {
  return (
    <SocketProvider>
      <div className="min-h-screen bg-[#2c2929] text-[#eae7e7] flex flex-col items-center p-10">
        <Chat />
      </div>
    </SocketProvider>
  );
}

export default App;
