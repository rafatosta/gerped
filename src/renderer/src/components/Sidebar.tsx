import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/">Home</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
