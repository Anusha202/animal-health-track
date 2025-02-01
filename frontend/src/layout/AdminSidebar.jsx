import { useState } from "react";
import {
  FaHome,
  FaCog,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaInbox,
  FaUserInjured,
} from "react-icons/fa";
import { FaCashRegister } from "react-icons/fa6";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { logout } from "../api/Userapp";
import { useUserStore } from "../store/userStore";

const AdminSidebar = () => {
 const { logoutState } = useUserStore()
  const navigate = useNavigate();
  async function  signout() {
    await logout();
    logoutState();
    navigate("/login");
  }
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-blue-400 via-blue-200 text-white w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out z-50`}
      >
        <div className="flex items-center justify-between p-4 md:hidden">
          <h1 className="text-lg font-bold">Vet Vitals</h1>
          <button onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>
        <div className="p-4 flex flex-col justify-between h-full">
          <div>
            <Link to="/">
              <div className=" flex items-center  ">
                <img
                  src="/logo.png"
                  alt=""
                  className="w-16 h-16 rounded-full "
                />
                <h1 className=" text-2xl font-bold mb-8 hidden md:block ">
                  Vet Vitals
                </h1>
              </div>
            </Link>

            <ul className="text-xl pt-5">
            <Link to="/admin/dashboards">

              <li className="mb-6 flex items-center hover:bg-gray-700 p-2 rounded">
                <FaHome className="mr-2" />
                <span>Dashboard</span>
              </li>
              </Link>
              {/* <li className="mb-6 flex items-center hover:bg-gray-700 p-2 rounded">
                <FaUsers className="mr-2" />
                <span>Users</span>
              </li> */}
              {/* <li className="mb-6 flex items-center hover:bg-gray-700 p-2 rounded">
                <FaCog className="mr-2" />
                <span>Settings</span>
              </li> */}
              <Link to="/admin/category">
                <li className="mb-6 flex items-center hover:bg-gray-700 p-2 rounded">
                  <FaCashRegister className="mr-2" />
                  <span>Category</span>
                </li>
              </Link>
              <Link to="/admin/vaccines">
                <li className="mb-6 flex items-center hover:bg-gray-700 p-2 rounded">
                  <i className="fa-solid fa-syringe mr-2"></i>
                  <span>Vaccine</span>
                </li>
              </Link>
              <Link to="/admin/adminmessage">
                <li className="mb-6 flex items-center hover:bg-gray-700 p-2 rounded">
                  <FaInbox className="mr-2" />
                  <span>Inbox</span>
                </li>
              </Link>

              {/* <Link to= '/setting'>
              <li className="mb-6 flex items-center hover:bg-gray-700 p-2 rounded">
                <FaCog className="mr-2" />
                <span>Setting</span>
                
              </li>
              </Link> */}
              {/* <li className="mb-6 flex items-center hover:bg-gray-700 p-2 rounded">
                <FaSignOutAlt className="mr-2" />
                <span>Logout</span>
              </li> */}
            </ul>

            <hr />
            {/* 
            <div className='flex items-center pt-9   lg:mx-auto md:mx-auto mx-auto  gap-16'> */}
            <div className="pt-6">
              <button
                onClick={signout}
                className="border-2 border-white border-solid px-2 py-2 cursor-pointer"
              >
                <FaSignOutAlt className="font-bold " />
              </button>
              <span className="ps-4 text-xl ">Logout</span>
            </div>
          </div>

          {/* Profile Section */}
          {/* <div className="flex items-center  p-4  mt-20">
            <img
              src="/team2.jpg"
              alt="Profile"
              className="w-20 h-20 rounded-full mr-3"
            />
            <div>
              <p className="font-medium">Sita Thapa</p>
              <p className="text-sm text-gray-200">sita122gmail.com</p>
            </div>
          </div> */}

          {/* <hr /> */}
        </div>
      </div>

      {/* Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 bg-gray-800 text-white p-2 rounded z-50"
      >
        <FaBars />
      </button>
    </div>
  );
};

export default AdminSidebar;
