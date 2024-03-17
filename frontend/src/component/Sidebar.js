import React,{useState,useEffect} from 'react';
import { FaHome, FaFire, FaRegThumbsUp, FaClock } from 'react-icons/fa';
import { Link,useLocation } from 'react-router-dom';

const Sidebar = ({ handleItemClick}) => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState('home');
  useEffect(() => {
    // Update selectedItem based on the current route
    switch (location.pathname) {
      case '/':
        setSelectedItem('home');
        break;
      case '/hot':
        setSelectedItem('hot');
        break;
      case '/top':
        setSelectedItem('top');
        break;
      case '/new':
        setSelectedItem('new');
        break;
      default:
        setSelectedItem('');
    }
  }, [location.pathname]);
  const handleItemClickInternal = (itemName) => {
    setSelectedItem(itemName);
    
    handleItemClick(itemName==='home'?'hot':itemName);
    
  };

  return (
    <div className="bg-black h-screen w-72 pl-8 pt-4 border-r-[1px] border-[#9c9c9c40]">
      <ul className="text-white">
        <li
          className={`p-3 mx-4 mb-1 hover:bg-[#202020] cursor-pointer rounded-xl ${
            selectedItem === 'home' && 'bg-[#2b2b2e] hover:bg-[#2b2b2e]'
          }`}
          onClick={() => handleItemClickInternal('home')}
        >
          <Link to="/">
            <div className="flex items-center">
              <FaHome className="mx-4" size={20} /> Home
            </div>
          </Link>
        </li>
        <li
          className={`p-3 mx-4 mb-1 hover:bg-[#202020] cursor-pointer  rounded-xl ${
            selectedItem === 'hot' && 'bg-[#2b2b2e] hover:bg-[#2b2b2e]'
          }`}
          onClick={() => handleItemClickInternal('hot')}
        >
          <Link to="/hot">
            <div className="flex items-center">
              <FaFire className="mx-4" size={20} /> Hot
            </div>
          </Link>
        </li>
        <li
          className={`p-3 mx-4 mb-1 hover:bg-[#202020] cursor-pointer  rounded-xl ${
            selectedItem === 'top' && 'bg-[#2b2b2e] hover:bg-[#2b2b2e]'
          }`}
          onClick={() => handleItemClickInternal('top')}
        >
          <Link to="/top">
            <div className="flex items-center">
              <FaRegThumbsUp className="mx-4" size={20} /> Top
            </div>
          </Link>
        </li>
        <li
          className={`p-3 mx-4 mb-1 hover:bg-[#202020] cursor-pointer rounded-xl ${
            selectedItem === 'new' && 'bg-[#2b2b2e] hover:bg-[#2b2b2e]'
          }`}
          onClick={() => handleItemClickInternal('new')}
        >
          <Link to="/new">
            <div className="flex items-center">
              <FaClock className="mx-4" size={20} /> New
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
