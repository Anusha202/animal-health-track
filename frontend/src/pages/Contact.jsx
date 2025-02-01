import React, { useState } from "react";
import { Link } from "react-router-dom";
import { submitMessage } from "../api/Submitsend";



  
const Contact = () => {

  const [contact_name, setContactName] = useState("")
  const [contact_email, setContactEmail] = useState('')
  const [contact_message, setContactMessage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSend = (event) => {
    event.preventDefault();

    //validation
    if(!contact_name) {
      setError("Please fill your name")
    }
    else if(contact_name.length <2){
      setError("Name should be more than 2 characters")
    }
    else if(!contact_email) {
      setError("Please fill your email")
    }
    else if(!contact_email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
      setError("Invalid Email")
    }
    else if(!contact_message){
      setError("Please fill your message")
    }
    else if(contact_message.length < 10){
      setError("Message should be more than 10 characters")
    }
    else {
      submitMessage({ contact_name, contact_email, contact_message })

      .then(data => {
        if(data.error) {
          setError(data.error)
          setSuccess(false)
        }
        else{
          setError("")
          setSuccess(true)

          setContactName('')
          setContactEmail('')
          setContactMessage('')
        }
      })
      .catch(error => console.log(error))
    }
  }
  const showError = () => {
    if(error){
      return <div className='font-bold text-red-300 text-lg text-center'>{error}</div>
    }
  }
  const showSuccess = () => {
    if(success){
        return <div className='text-green-500 text-xl font-bold text-center py-5'>"Message Sent Successfully"</div>
    }
}
  return (
    <>
      <div className="w-full h-64 relative">
        <div className="w-full h-full object-cover bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 p-10" />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center z-10 text-white">
          <h2 className="text-3xl font-bold">CONTACT</h2>
          <div className='flex-wrap flex flex-row justify-center'>
            <h1 className='text-white text-center font-semibold text-xl'>
              <Link to='/'>Home</Link> 
              <span className='ps-2'> <i className="fa-solid fa-greater-than text-white"></i> </span>
            </h1>
            <h1 className='text-white text-center font-semibold text-xl ps-2'>
              <Link to='/contact'>Contact</Link>
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-around mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
        <div className="w-full md:w-2/5 flex flex-col pr-10">
          <h2 className="text-4xl font-semibold text-gray-800 pb-6 mb-6">
            Contact Info
            <div className="border-b-2 border-blue-200 w-16 pt-2"></div>
          </h2>
          <p className="text-gray-600 mb-4 pb-8">
            For inquiries or further information, please feel free to reach out
            to us or call us. You can also connect with us through our social
            media channels. We’re here to assist you and look forward to hearing
            from you!
          </p>
          <div className="space-y-2 mb-6">
            <span className="text-blue-300 pb-2">
              <i className="fa-solid fa-phone text-xl mr-4"></i>
            </span>
            <span className="cursor-pointer"> +977-987654321</span>
            <br className="mb-1" />
            <br className="mb-1" />
            <span className="text-blue-300">
              <i className="fa-solid fa-message text-xl mr-4"></i>
            </span>
            <span className="cursor-pointer"> contact@domain.com</span>
            <br />
            <br className="mb-1" />
            <span className="text-blue-300">
              <i className="fa-solid fa-link text-xl mr-4"></i>
            </span>
            <span className="cursor-pointer"> www.contactdomain.com</span>
            <br />
            <br className="mb-1" />
            <span className="text-blue-300">
              <i className="fa-solid fa-location-crosshairs text-xl mr-4 pb-5"></i>
            </span>
            <span className="cursor-pointer"> Sanepa, Lalitpur</span>
          </div>

          <div className="rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.940348876112!2d85.29995187546668!3d27.68823847619348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb184a281e7491%3A0xf947496b7f4831a7!2sSagarmatha%20College%20of%20Science%20and%20Technology%20%5BSCST%5D!5e0!3m2!1sen!2snp!4v1726974034459!5m2!1sen!2snp"
              width="600"
              height="400"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </div>
        </div>

        <div className="w-full md:w-2/5 flex flex-col items-start mr-9 mt-8 md:mt-0">
          <h2 className="text-4xl font-semibold text-gray-800 pb-6">
            Get In Touch
            <div className="border-b-2 border-blue-200 w-16 pt-2"></div>
          </h2>
          {showError()}
          {showSuccess()}
          <form className="w-full bg-white p-6 rounded-lg shadow-md" onSubmit={handleSend}>

            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 text-xl"
                htmlFor="name"
              >
                Name
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <i className="fa-solid fa-user text-black p-2"></i>
                <input
                  type="text"
                  id="name"
                  className="w-full p-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Your Name"
                  value={contact_name}
                  onChange={event =>setContactName(event.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 text-xl"
                htmlFor="email"
              >
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <i className="fa-solid fa-envelope text-black p-2"></i>
                <input
                  type="email"
                  id="email"
                  className="w-full p-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="Your Email"
                  value={contact_email}
                  onChange={event =>setContactEmail(event.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2 text-xl"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                rows="4"
                placeholder="Your Message"
                value={contact_message}
                onChange={event =>setContactMessage(event.target.value)}
              ></textarea>
            </div>
            <button className="w-2/5 text-blue-300 py-2 border border-blue-300 transition duration-200 hover:bg-blue-200 hover:text-white">
              Send Message
            </button>
          </form>
        </div>
      </div>

    
      {/* <div className="mt-12 px-4 md:px-16">
  
      <div className="flex flex-wrap justify-center mb-6">
  <div className="flex-none w-full md:w-1/3 px-2 -mb-16">
 
    <img src="g-3.jpg" alt="Image 1" className="w-full rounded-lg h-full -mb-10" />
  </div>
  <div className="flex-none w-full md:w-1/3 px-2  -mb-16">
    <img src="hen.jpg" alt="Image 2" className="w-full rounded-lg h-full -mb-10" />
  </div>
  <div className="flex-none w-full md:w-1/3 px-2  -mb-16">
    <img src="images.jpeg" alt="Image 3" className="w-full rounded-lg h-full " />
  </div>

</div>

<div className="bg-blue-200 p-8">
  <h2 className="text-4xl font-semibold text-gray-800 text-center mb-6 mt-6">
    Have Questions?
  </h2>
  <p className="text-gray-600 text-center mb-8">
    Proin eleifend in mi eu efficitur. Sed interdum lectus at consequat interdum. Sed sed sem neque. Integer ac volutpat est, non mollis dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper m.
  </p>
</div>

  
  
  <div className="text-center">
    <button className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg transition duration-200 hover:bg-blue-600 mb-14 mt-10">
      Send A Message
    </button>
  </div> */}

    </>
  );
};

export default Contact;