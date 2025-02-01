import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const dailyRecordSchema = mongoose.Schema ({
    useranimal: {
        type:ObjectId,
        ref:"UserAnimal",
        required: false
    },
    weight: {
        type: Number,
        required: true
    },
    production: {
        type: Number
        
    },
    temperature: {
        type: Number,
        required: false
    }
}, {timestamps:true})

export const Dailyrecord = mongoose.model('Dailyrecord',dailyRecordSchema)