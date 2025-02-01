import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

const Footer = () => {
  return (
    <footer className="bg-blue-200  py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start px-6">
        {/* Logo Section */}
        {/* <div className="flex items-center  mb-6 md:mb-0">
          <img src="logo.png" className="w-16 h-16 mr-2" alt="Vet Vitals Logo" />
          <h1 className="text-2xl font-bold text-blue-500">Vet Vitals</h1>

        </div> */}

        <div className="container w-full md:w-1/4 py-2  md:py-0 px-5 flex flex-col justify-center ">
          <Link to="/">
            <div className="title flex items-center py-2">
              <div className="logo  w-[15%] sm:w-[5%] md:w-[20%]">
                <img src="/logo.png" alt="AKA Ticket" className=" w-full rounded-full" />
              </div>
              <h2 className="ps-3 heading font-bold text-black text-2xl md:text-xl tracking-wider">
                Vet Vitals
              </h2>
            </div>
          </Link>
          <div className="description text-black text-sm md:text-base pt-3">
            Vet Vitals is a comprehensive solution designed to empower farmers
            with advanced tools for tracking and enhancing livestock.
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">Quick Links</h2>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="text-blue-600 hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-blue-600 hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/animals" className="text-blue-600 hover:underline">
                Animals
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-blue-600 hover:underline">
                Contact
              </Link>
            </li>
            
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">Contact Info</h2>
          <p className="">
            Sagarmatha College of Science and Technology
            <p className="pt-2" />
            Sanepa, Lalitpur
          </p>
          <p className="pt-2">+977-987654321</p>
          <p className="text-blue-600 pt-2">admin@weam2h.com</p>
        </div>

        <div className="flex flex-col w-full md:w-1/2 lg:w-1/4 pb-6 ">
          <h1 className="text-2xl font-bold  ">Our Instagram </h1>
          <div className="flex flex-wrap w-full ">
            <img src="/dog2.jpg" alt="" className="w-1/3 p-2 h-28" />
            <img src="/hen.jpg" alt="" className="w-1/3 p-2 h-28" />
            <img src="/dog.jpeg" alt="" className="w-1/3 p-2 h-28" />
            <img src="/g-3.jpg" alt="" className="w-1/3 p-2 h-28" />
            <img src="/images.jpeg" alt="" className="w-1/3 p-2 h-28" />
            <img src="/g-7.jpg" alt="" className="w-1/3 p-2 h-28" />
          </div>
        </div>
      </div>

      <hr className="" />
      <p className="footer-copyright text-center pt-6">
        Copyright 2024 @ vetvitals.com - All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
