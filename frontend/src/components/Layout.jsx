// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import Navbar from './Navbar'
// import Footer from './Footer'

// const Layout = () => {
//   return (
//     <>
//         <Navbar/>
//             <Outlet/>
//             <Footer/>
//     </>
//   )
// }

// export default Layout





import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();

 
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      <Navbar />
      <Outlet />
     
      {!isAdminPage && <Footer />}
    </>
  );
};

export default Layout;
