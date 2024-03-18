import MessageContainer from "./MessageContainer/MessageContainer";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { IoLogoSnapchat } from "react-icons/io";

const ChatPage = () => {
  return (
    
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
      <div className="flex my-6 items-center justify-center">
        <h1 className="font-bold text-white text-2xl mx-4">Chat With Randoms </h1>
        <IoLogoSnapchat className="h-10 w-10"/>
      </div>

      <div className="flex w-[1000px] h-[600px] rounded-lg overflow-hidden bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};
export default ChatPage;
