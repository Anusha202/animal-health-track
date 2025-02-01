import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <>
    {/* top about */}
    <div>
    <div className="w-full h-64 relative">
        <div className="w-full h-full object-cover bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 p-10" />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl font-bold">ABOUT</h2>
          <div className='flex-wrap flex flex-row justify-center'>
            <h1 className='text-white text-center font-semibold text-xl'>
              <Link to='/'>Home</Link> 
              <span className='ps-2'> <i className="fa-solid fa-greater-than text-white"></i> </span>
            </h1>
            <h1 className='text-white text-center font-semibold text-xl ps-2'>
              <Link to='/contact'>About</Link>
            </h1>
          </div>
        </div>
      </div>
      </div>


<div className="w-5/6 mx-auto  pt-12">
  {/* About us section */}
  <div className="flex flex-col sm:flex-row justify-between gap-6 px-8">
 
    <div className="w-full sm:w-1/3 md:w-1/4">
      <h1 className="font-extrabold text-2xl sm:text-2xl md:text-3xl text-blue-900 pt-4">
        About Us 
      </h1>
      <span className="text-4xl sm:text-5xl tracking-wider font-semibold pt-3 text-sky-500 mt-2 block">
        Heath Care Tracking
      </span>
    </div>

   
    <div className="w-full sm:w-2/3 md:w-2/3 bg-blue-50 border border-solid px-4 py-4 sm:py-6 rounded-t-lg rounded-b-lg">
      <p className="text-base sm:text-xl font-normal leading-relaxed p-6 ">
     It was created with the goal of simplifying the way animal health care is managed. Our platform offers tools to access comprehensive health records, receive timely reminders for vaccinations and treatments, and connect directly with qualified veterinarians. We also provide educational content to help pet owners stay informed and proactive about their animal's well-being.
      </p>
    </div>
  </div>
 
</div>
{/* team */}
<div className="pt-8 w-5/6 mx-auto pb-5">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 py-12">
    <div className="img1 aspect-square">
      <img src="g-1.jpg" alt="Image 1" className="w-full h-full object-cover rounded-lg shadow-md" />
    </div>
    <div className="img2 aspect-square">
      <img src="g-2.jpg" alt="Image 2" className="w-full h-full object-cover rounded-lg shadow-md" />
    </div>
    <div className="img3 aspect-square">
      <img src="g-6.jpg" alt="Image 3" className="w-full h-full object-cover rounded-lg shadow-md" />
    </div>
    <div className="img4 aspect-square">
      <img src="g-7.jpg" alt="Image 4" className="w-full h-full object-cover rounded-lg shadow-md" />
    </div>
  </div>
</div>

{/* about us desc */}
<div className="bg-blue-50 w-full pt-4">
<div className="w-5/6 mx-auto py-8  ">
  <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-blue-50   ">
    {/* Text Section */}
    <div className="lg:w-2/3">
      <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-blue-900 ">
        About Us
      </h1>
      <span className="text-3xl sm:text-4xl md:text-5xl tracking-wider font-semibold text-sky-500 mt-4 block">
        The Finest Four Legged Care
      </span>
      <div className="mt-4">
        <p className="font-bold pt-4 pb-5 text-lg sm:text-xl">
          Through our intuitive platform, vet owners can receive automated reminders for upcoming vet visits, vaccination schedules, and medication refills, ensuring their pets receive timely and consistent care</p>
        <p className="text-lg sm:text-xl">
        Our service allows users to easily access and manage their vet's medical records, track vaccinations, medications, and treatment plans, and monitor vital health trends over time. Through our intuitive platform, pet owners can receive automated reminders for upcoming vet visits, vaccination schedules, and medication refills, ensuring their pets receive timely and consistent care
        </p>
      </div>
    </div>

    <div className="w-full lg:w-1/3 pt-5 img1">
      <img 
        src="/g-4.jpg" 
        alt="About Us" 
        className="rounded-lg shadow-lg w-full h-[300px] md:h-[700px] lg:h-[500px] object-cover" 
      />
    </div>
  </div>
</div>
</div>
{/* testominal */}

<div className="w-5/6 mx-auto pt-12 pb-12">
  <div className="flex flex-col lg:flex-row items-center gap-8 py-8">
    {/* Left Section: Text */}
    <div className="lg:w-3/5">
      <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-blue-900">
        Testimonial
      </h1>
      <span className="text-3xl sm:text-4xl md:text-5xl tracking-wider font-semibold text-sky-500 mt-4 block">
        What Customer Says
      </span>
      <p className="pb-5 text-gray-600 text-lg">
      We provide extensive health care of your animals.
      </p>

      {/* Testimonials Section */}
      <div className="flex flex-col sm:flex-row gap-4 pt-2 ">
        <div className="border bg-blue-50 p-4 rounded-lg shadow-md w-full sm:w-1/2 pb-12  ">
      <h1 className='pb-3 text-xl'>⭐⭐⭐⭐⭐</h1>
          <p className="text-gray-700">
          I enjoy the peace of mind that comes from receiving timely alerts and having all our animal's health information in one place. The direct communication with veterinary professionals adds an extra layer of trust and confidence in our animal's care.
          </p>
          <div className="flex items-center mt-4 gap-6 pt-5 img1">
            <img
              src="/team1.jpg"
              alt="Jhon Doe"
              className="rounded-full w-20 h-19 object-cover "
            />
            <div className="ml-3">
              <h3 className="font-bold text-blue-900">Ram Nepal</h3>
              <span className="text-gray-500 text-sm">Cowherd</span>
            </div>
          </div>
        </div>
        <div className="border bg-blue-50 p-4 rounded-lg shadow-md w-full sm:w-1/2">
        <h1 className='pb-3 text-xl '>⭐⭐⭐⭐⭐</h1>
          <p className="text-gray-700">
          Our customers appreciate our platform for its user-friendly design and the convenience it offers in managing their pets' health. They value the timely reminders, easy access to health records, and the direct connection with trusted veterinarians. 
          </p>
          <div className="flex items-center mt-4 gap-6 pt-6 img1">
            <img
              src="/team2.jpg"
              alt="Jenifer Doe"
              className="rounded-full w-20 h-19 object-cover"
            />
            <div className="ml-3">
              <h3 className="font-bold text-blue-900">Sita Sharma</h3>
              <span className="text-gray-500 text-sm">Farmer</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Right Section: Image */}
    <div className="lg:w-2/5 hidden md:hidden lg:block img1 ">
      <img
        src="/g-8.jpg"
        alt="Testimonial Image"
        className="rounded-lg shadow-lg w-full h-[500px] object-cover"
      />
    </div>
  </div>
</div>







    </>
  )
}

export default About