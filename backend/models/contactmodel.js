import mongoose from "mongoose"
const contactSchema = mongoose.Schema({
    contact_name : {
        type: String,
        required: true
    },
    contact_email : {
        type: String,
        required: true
    },
    contact_message: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const Contactmessage = mongoose.model('contactmessage',contactSchema);
