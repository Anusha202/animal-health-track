import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getallmessage } from "../api/Submitsend";

const AdminMessage = () => {
  let [message, setMessage] = useState([]);
  useEffect(() => {
    getallmessage().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setMessage(data.reverse());
      }
    });
  }, []);
  return (
    <div className="w-1/2">
      <h1 className="font-bold text-5xl ps-11 py-12 ">Messages</h1>
      {message.map((mess) => {
        return (
          <div key={mess._id} className=" ps-10 pb-4 ">
            <Link to={`/messageview/${mess._id}`} className="">
              <h1 className="font-bold ">{mess.contact_name}</h1>

              <h1>{mess.contact_email}</h1>

              <p className=" font-semibold ">{mess.contact_message}</p>
            </Link>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default AdminMessage;
