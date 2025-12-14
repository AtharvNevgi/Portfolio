import { NavLink } from "react-router-dom";
import {useState} from 'react';

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Skill", path: "/skills"},
    { name: "Experience", path: "/experience" },
    { name: "Services", path: "/services" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" }
  ];

  const [sidePosition, setSidePosition] = useState(false);

  const handleSideBar = () => {
    if(sidePosition){
      setSidePosition(false);
    }else{
      setSidePosition(true);
    }
  }

  return (
    <>
      <button onClick={handleSideBar}>Sidebar</button>
      <div className={sidePosition ? "w-64 h-screen bg-gray-900 text-white fixed left-0 top-0 p-5": "hidden"}>
        <div className="flex gap-2 p-2">
          <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>
          <button onClick={handleSideBar}>Sidebar</button>
        </div>
        <ul className="space-y-3">
          {menu.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block p-2 rounded hover:bg-gray-700 transition ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}