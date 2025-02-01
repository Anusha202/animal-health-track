
import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const vaccineSchema = new mongoose.Schema(
    {
        vaccine_name: {
            type: String,
            required: true
        },
        animal_type: {
            type: ObjectId,
            ref: "AnimalCategory",
            required:true
        },
        breeds: [{
            type: ObjectId,
            ref: "Breed",
            required:true
    }],
        // frequency: {
        //     type:String,
        //     required: true,
        // },
        // duration: {
        //     type: String,
        //     required:true
        // },
        // age_range: {
        //   min: { type: Number, required: true },
        //   max: { type: Number, required: true },
        // },
        effectiveness: [
          {
            minAge: { type: Number, required: true }, // Minimum age for effectiveness
            maxAge: { type: Number, required: true }, // Maximum age for effectiveness
            effectivenessPercentage: { type: Number, required: true } // Effectiveness %
          }
        ]
    },
{
    timestamps:true
}
)

export const Vaccine = mongoose.model("Vaccine", vaccineSchema)