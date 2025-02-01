import { Contactmessage } from "../models/contactmodel.js";
import sendEmail from "../utils/emailSender.js"

export const submitMessage = async (req, res) => {
    try {
        let contactmessage = new Contactmessage({
            contact_name: req.body.contact_name,
            contact_email: req.body.contact_email,
            contact_message: req.body.contact_message
        })
        const savedContactmessage = await contactmessage.save();

        sendEmail({
            from: "noreply@something.com",
            to: req.body.contact_email,
            subject: "User Message Email",
            text: `Send message: \n contact_name: ${contactmessage.contact_name}\n
            contact_email: ${contactmessage.contact_email}\n
            conatct_message: ${contactmessage.contact_message}`
        });
        res.status(200).json({success:true, data:savedContactmessage})
        
    } catch (error) {
        console.error("Error in sending message:", error)
        res.status(400).json({success:false, error: error.message})
        
    }
}

//get all message

export const getAllMessage = async(req, res) => {
    let message = await Contactmessage.find()
    if(!message) {
        return res.status(400).json({error: "No message found"})
    }
    res.send(message)
}
//get all message by id

export const getMessage = async(req, res) => {
    let message = await Contactmessage.findById(req.params.id)
    if(!message) {
        return res.status(400).json({error: "Message not found"})
    }
    res.send(message)
}