import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../../hooks/useConversation";
import useGetConversations from "../../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  var filteredConversations = [];
  if (search.length != 0) {
    filteredConversations = conversations.filter((conversation) =>
      conversation.username.toLowerCase().includes(search.toLowerCase())
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    if (filteredConversations.length > 0) {
      setSelectedConversation(filteredConversations[0]);
      setSearch("");
    } else {
      toast.error("No such user found!");
    }
  };
  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setSearch("");
    filteredConversations = []
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search username"
          className="input input-bordered rounded-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-circle bg-sky-500 text-white">
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
      </form>

      {filteredConversations.length>0 && (
        <div className="absolute z-50 bg-gray-100 mt-2 ml-4 p-2 rounded-sm text-black border-1">
        {filteredConversations.map((conversation) => (
            
          <div
          className="cursor-pointer"
            key={conversation.id}
            onClick={() => handleSelectConversation(conversation)}
          >
            {conversation.username}
          </div>
        ))}
      </div>
      )
        
      }
      
      
    </div>
  );
};

export default SearchInput;
