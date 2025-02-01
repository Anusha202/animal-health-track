import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitMessage } from '../api/Submitsend';

const Home = () => {
  const [contact_name, setContactName] = useState('');
  const [contact_email, setContactEmail] = useState('')
  const [contact_message, setContactMessage] = useState("I would like to know about this vet Vitals briefly!!!")
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();


    // Validation for email
    if (!contact_email) {
      setError("Please fill your email");
    } else if (!contact_email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setError("Invalid Email");
    } else {
      const contactname = contact_email.substring(0, contact_email.indexOf('@'));
      setContactName(contactname);

      const messageData = {
        contact_email,
        contact_name: contactname,
        contact_message,
      };
      submitMessage(messageData)
      .then((data) => {
        if(data.error) {
          setError(data.error);
          setSuccess(false)
        }
        else {
          setError('')
          setSuccess(true)
          setContactEmail('')
          setContactName('')
          setContactMessage('')
        }
      })
      .catch((error) => console.log(error))
  };

  }

  const showError = () => {
    if (error) {
      return <div className="text-red-800 font-bold text-2xl pt-3  text-center">{error}</div>;
    }
  };

  const showSuccess = () => {
    if (success) {
      return <div className="text-green-800 text-2xl font-bold text-center pt-3">"Message Sent Successfully"</div>;
    }
  };

  
  return (
    <>
      <div className="h-screen w-full flex flex-col md:flex-row pt-24 pb-12 items-center bg-gradient-to-r from-blue-300 via-blue-200 to-white px-6 md:px-10">
        {/* Text Content */}
        <div className="flex flex-col items-start w-full md:w-1/2 px-4 md:px-12 space-y-6">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Time for You <br /> and Your Animal
          </h1>
          <p className="text-blue-600 text-lg md:text-xl lg:text-2xl leading-relaxed">
            The Caring <br /> Professional Team
          </p>
          <Link to="/about">
            <button className="px-6 py-2 md:px-8 md:py-3 bg-blue-500 text-white font-semibold rounded-full text-lg hover:bg-blue-600 transition-shadow shadow-lg transform hover:scale-105">
              Discover More
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0 px-4 md:px-10">
          <img
            src="dog.jpeg"
            alt="A happy dog"
            className="rounded-3xl shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>

      <div className="bg-blue-50 py-12 md:py-16 px-6 md:px-16">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-blue-600">
          Why Choose Us
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
          {/* Feature 1 */}
          <div className="flex flex-col items-center p-6 md:p-8 bg-white rounded-2xl shadow-lg max-w-sm md:max-w-md">
            <img
              src="hen.jpg"
              alt="Experience Icon"
              className="w-20 h-20 md:w-24 md:h-24 mb-4 md:mb-6 rounded-full shadow-md"
            />
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-gray-800">
              Experienced Veterinarians
            </h3>
            <p className="text-center text-gray-600">
              With years of hands-on expertise across a wide range of medical fields, including preventive care, diagnostics.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center p-6 md:p-8 bg-white rounded-2xl shadow-lg max-w-sm md:max-w-md">
            <img
              src="images.jpeg"
              alt="Animal Lover Icon"
              className="w-20 h-20 md:w-24 md:h-24 mb-4 md:mb-6 rounded-full shadow-md"
            />
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-gray-800">
              Animal Lover
            </h3>
            <p className="text-center text-gray-600">
              Our team of passionate animal lovers is the driving force behind our website, dedicated to celebrating and caring for animals of all kinds.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center p-6 md:p-8 bg-white rounded-2xl shadow-lg max-w-sm md:max-w-md">
            <img
              src="dog.jpeg"
              alt="Certified Doctor Icon"
              className="w-20 h-20 md:w-24 md:h-24 mb-4 md:mb-6 rounded-full shadow-md"
            />
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-gray-800">
              Better Health Management
            </h3>
            <p className="text-center text-gray-600">
              Pet owners can monitor their pet's health trends over time, which is helpful for chronic conditions.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-12 md:py-16 px-6 md:px-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-gray-500">
            !! Quality Vet Care !!
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Notifications and reminders encourage responsible pet ownership and timely health checks, improving overall animal health.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 py-12 md:py-16 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-700">
          What Our Customers Say
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
          {/* Testimonial 1 */}
          <div className="bg-blue-100 p-6 md:p-8 rounded-2xl shadow-lg max-w-sm md:max-w-lg">
            <div className="flex space-x-1">
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
            </div>
            <p className="text-gray-600 italic mb-4 md:mb-6">
              "Our customers consistently express their appreciation for the Vet Health Care website as an essential tool for managing their pets' health. Pet owners love the convenience of having all their pet’s medical records in one secure place and the ease of scheduling appointments online. Many have shared how the timely reminders and personalized health tips have helped them stay on top of vaccinations and treatments, ultimately leading to healthier pets."
            </p>
            <h4 className="font-semibold text-xl md:text-2xl text-gray-800">Ram Nepal</h4>
            <p className="text-gray-500">Cowherd</p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-blue-100 p-6 md:p-8 rounded-2xl shadow-lg max-w-sm md:max-w-lg">
            <div className="flex space-x-1">
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <i className="fa-solid fa-star text-yellow-500"></i>
            </div>
            <p className="text-gray-600 italic mb-4 md:mb-6">
              "The automated reminders and tailored health insights have proven invaluable in preventing health issues and maintaining regular care. Veterinarians have noted how the platform helps reduce paperwork and improve communication, allowing them to dedicate more time to patient care. The educational resources and interactive community features have also been a hit, empowering pet owners with knowledge and creating a supportive network."
            </p>
            <h4 className="font-semibold text-xl md:text-2xl text-gray-800">Sita Sharma</h4>
            <p className="text-gray-500">Farmer</p>
          </div>
        </div>
      </div>

      <div className="bg-white py-12 md:py-16 px-6 md:px-16">
        <div className="flex flex-col md:flex-row items-center md:items-start max-w-5xl mx-auto gap-6 md:gap-8">
          {/* Text Section */}
          <div className="md:w-1/2 text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-700">
              About Us
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              It was created with the goal of simplifying the way animal health care is managed. Our platform offers tools to access comprehensive health records, receive timely reminders for vaccinations and treatments, and connect directly with qualified veterinarians. We also provide educational content to help pet owners stay informed and proactive about their animal's well-being.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mt-4">
              Rita Gautam
            </p>
            <Link to="/contact">
              <button className="px-6 py-2 mt-4 md:mt-6 bg-blue-500 text-white font-semibold rounded-full text-lg hover:bg-blue-600 transition-shadow shadow-lg transform hover:scale-105">
                Contact Us
              </button>
            </Link>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 mt-6 md:mt-0">
            <img
              src="images.jpeg"
              alt="Team at work"
              className="rounded-3xl shadow-lg w-full h-auto object-cover"
            />

            
          </div>

        </div>
        
      </div>
       {/* news letter */}
      <div className='w-full bg-blue-50  '>
  
          <div className='  text-center py-12 '>
            <h1 className=' p-3  text-3xl md:text-3xl font-bold '>Join Our Newsletter</h1>
            <p className='text-xl md:text-xl'>Sign up to receive our Newsletter</p>
            {showError()}
            {showSuccess()}
            <div className="flex items-center justify-center   pb-12 pt-6 ">
          
          <form className="flex flex-col md:flex-row w-full max-w-3xl   md:px-0  " onSubmit={handleSubmit}>
            <input
              className="border border-stone-400 w-full py-2 px-3 pl-8 rounded-full mb-4 md:mb-0 md:mr-2"
              type="email"
              placeholder="Enter Your E-mail Address"
              value={contact_email}
              onChange={event => setContactEmail(event.target.value)}
            />
            <input type='hidden' value={contact_name}/>
            <input type='hidden' value={contact_email} />
            <input type='hidden' value={contact_message}/>
            
            <button className="border-2 rounded-full px-8 py-3 text-lg font-semibold transition duration-200 ease-in-out hover:bg-red-200  bg-red-400 text-white ">
              Subscribe
            </button>
          </form>
        </div>


          </div>
        </div>

        
    </>
  );
};

export default Home;
