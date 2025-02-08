import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const vaccineSchema = new mongoose.Schema(
  {
    vaccine_name: {
      type: String,
      required: true,
    },
    animal_type: {
      type: ObjectId,
      ref: "AnimalCategory",
      required: true,
    },
    breeds: [
      {
        type: ObjectId,
        ref: "Breed",
        required: true,
      },
    ],
    effectiveness: [
      {
        minAge: { type: Number, required: true },
        maxAge: { type: Number, required: true },
        effectivenessPercentage: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Vaccine = mongoose.model("Vaccine", vaccineSchema);
