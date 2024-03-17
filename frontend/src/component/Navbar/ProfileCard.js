import React from 'react'
import { Link } from 'react-router-dom';

export default function ProfileCard({ handleLogout }) {
    return (
        <div className="absolute right-0 mt-2 bg-white w-48 rounded-lg shadow-lg mr-4">
          <ul className="py-2">
            <Link to='/profile'>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            profile
            </li>
            </Link>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </div>
      );
}