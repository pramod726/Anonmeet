import MessageContainer from "./MessageContainer/MessageContainer";
import Sidebar from "./Sidebar/Sidebar";

const ChatPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex w-[1000px] h-[600px] rounded-lg overflow-hidden bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};
export default ChatPage;