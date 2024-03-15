import MessageContainer from "./MessageContainer/MessageContainer";
import Sidebar from "./Sidebar/Sidebar";

const ChatPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-yellow-600">
      <div className="flex w-[1200px] h-[900px] rounded-lg overflow-hidden bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};
export default ChatPage;