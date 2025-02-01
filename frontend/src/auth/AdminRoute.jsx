import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import AdminSidebar from "../layout/AdminSidebar";

const AdminRoute = () => {
  const { isAuthenticated, user } = useUserStore();
  console.log("role:", user);

  return isAuthenticated && user?.role === 1 ? (
    <>
      <AdminSidebar />
      <div className="w-full">
      <Outlet />

      </div>
    </>
  ) : (
      <Navigate to="/" />
    );
};

export default AdminRoute
// import React from 'react'

// import { Navigate, Outlet } from 'react-router-dom'
// import { useUserStore } from '../store/userStore';

// const AdminRoute = () => {
//   const { isAuthenticated } = useUserStore();
//   return (
//     isAuthenticated() && isAuthenticated().user.role === '1' ? <Outlet/> : <Navigate to ='/login' />
//   )
// }
