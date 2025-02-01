import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getmessage } from '../api/Submitsend'

const MessageView = () => {
    const { id } = useParams()
    let [message, setMessage] = useState(null)

    //To fetch all message

    useEffect(() => {
        getmessage(id)
        .then((data) => {
            console.log("data message", data)
            if(data?.error) {
                console.log(data.error)
            } else {
                console.log(data)
                setMessage(data)
            }
        })
        .catch((error) => {
            console.log("Error fetching message", error)
        })
    }, [id])

  return (
    <div className=''>
        <div className="pt-12">
            {message && (
                <>
                <h1 className='font-semibold text-2xl'>
                    <span className='text-xl font-bold'>From: </span>{message.contact_name}

                </h1>
                <h1 className='font-semibold'>
                    <span className='font-semibold text-lg'>To:</span> Vet Vitals

                </h1>
                <h1>
                    <span className='font-semibold text-lg '>Email:</span> {message.contact_email}
                </h1>

            <hr className='mt-2 mb-2' />
            <h1>Message: {message.contact_message}</h1>
                </>
            )}
        </div>

    </div>
  )
}

export default MessageView