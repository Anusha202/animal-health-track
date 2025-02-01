import { useEffect, useRef, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { authenticate, logout } from "../api/Userapp";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const sidebarRef = useRef(null);
  const { isAuthenticated, user, loginState, logoutState } = useUserStore(); // Access Zustand state and actions
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [navbar]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await authenticate();
        if (response.success) {
          loginState(response.user); // Update Zustand store with the user data
          console.log(response.user)
        } else {
          // setIsAuthenticated(false);
          // setUser(null);
          logoutState();
        }
      } catch (error) {
        console.error("Error checking auth status");
        // setIsAuthenticated(false);
        logoutState();
      }
    };
    checkAuthStatus();
  }, [loginState, logoutState]);

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setNavbar(false);
    }
  };

  const handleNavbar = () => {
    setNavbar(!navbar);
  };

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await logout();
      logoutState();
      console.log("Toast should show now");
      toast.success("Successfully Logged Out!"); // Show toast before navigating
      setTimeout(() => {
        navigate('/'); // Redirect to login page after toast closes
      }, 3000); // Wait for the toast to finish (3000ms = 3 seconds)
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("An error occurred during logout.");
    }
  };

  return (
    <nav className="bg-white text-base py-4 sticky top-0 shadow-md">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 w-full">

        {/* Logo and Title */}
        <div className="w-2/3 md:w-1/3 flex items-center">
          <div className="logo w-[20%] sm:w-[22%] md:w-[20%] lg:w-[12%]">
            <img
              src="/logo.png"
              alt="Vite Vitals"
              className="rounded-full w-full"
            />
          </div>
          <Link to="/">
            <span className="heading text-2xl sm:text-3xl text-blue-900 ps-2 font-bold">
              Vet Vitals
            </span>
          </Link>
        </div>

        {/* Desktop Navbar */}
        <div className="nav-content w-1/3 md:w-2/3 hidden md:flex justify-between items-center list-none text-lg font-medium ">
          <Link to="/">
            <li className="text-black hover:text-blue-500">Home</li>
          </Link>
          <Link to="/about">
            <li className="text-black hover:text-blue-500">About Us</li>
          </Link>
          {isAuthenticated && (

          <Link to="/animals">
            <li className="text-black hover:text-blue-500">Animals</li>
          </Link>
          )}

          <Link to="/contact">
            <li className="text-black hover:text-blue-500">Contact Us</li>
          </Link>
          {/* <Link to="/login">
            <li className="text-black hover:text-blue-500">Login</li>
          </Link> */}
          {!isAuthenticated && (
            <>
              <Link to="/register">
                <li className="text-black hover:text-blue-500 ">Register</li>
              </Link>
              <Link to="/login">
                <li className="text-black hover:text-blue-500 ">Login</li>
              </Link>
            </>
          )}

          {/* <li className="notification">
            <i className="fa fa-bell "></i>
            <span className="notification-count">3</span>
          </li> */}
        </div>

        {/* <div className="profile w-[55px] h-[50px] flex justify-center items-center rounded-full text-white bg-[#023478] overflow-hidden mx-4">
  <img src="/team2.jpg" alt="Profile" className="w-full h-full object-cover" />
</div> */}

        {isAuthenticated && (
          <div className="relative ps-10">
            {/* Profile Image */}
            <div
              className="profile w-[55px] h-[50px] flex justify-center items-center rounded-full text-white bg-[#023478] overflow-hidden mx-4 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
            >
              <img
                src="/team2.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                <ul className="py-1 text-sm text-gray-700">
                  {user?.role === 1 && (
                    <>
                    <li>
                      <Link
                        to="/admin/dashboards"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    </li>
                  <hr className="" />
                    
                    </>
                  )}
                  <li>
                    <Link
                      onClick={handleLogout}
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <div onClick={handleNavbar} className="md:hidden cursor-pointer">
          <IoMenu className="text-black text-3xl" />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div
        className={
          navbar
            ? "fixed right-0 top-0 w-[65%] md:hidden h-screen bg-white p-10 ease-in duration-100 z-50"
            : "fixed left-[-100%] top-0 p-10 ease-in duration-100"
        }
        ref={sidebarRef}
      >
        <div className="flex justify-end cursor-pointer" onClick={handleNavbar}>
          <IoClose className="text-black text-3xl" />
        </div>

        {/* Mobile Links */}
        <div className="list-none pt-16 text-lg sm:text-xl">
          <Link to="/">
            <li className="py-4 text-black hover:text-blue-500">Home</li>
          </Link>
          <Link to="/about">
            <li className="py-4 text-black hover:text-blue-500">About Us</li>
          </Link>

          <Link to="/animals">
            <li className="py-4 text-black hover:text-blue-500">Animals</li>
          </Link>

          <Link to="/contact">
            <li className="py-4 text-black hover:text-blue-500">Contact Us</li>
          </Link>

          {isAuthenticated ? (
            <li
              className="py-4 text-black hover:text-blue-500 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
          ) : (
            <>
              <Link to="/register">
                <li className="py-4 text-black hover:text-blue-500">
                  Register
                </li>
              </Link>
              <Link to="/login">
                <li className="py-4 text-black hover:text-blue-500">Login</li>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </nav>
  );
};

export default Navbar;
