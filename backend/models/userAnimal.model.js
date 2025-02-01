import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const userAnimalSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    animal_type: {
      type: ObjectId,
      ref: "AnimalCategory",
      required: true,
    },
    breed:{
      type:ObjectId,
      ref:"Breed",
      required:true
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    acceptedVaccines: [{ type: ObjectId, ref: "Vaccine" }], // Stores vaccines accepted by the user
    rejectedVaccines: [{ type: ObjectId, ref: "Vaccine" }], // Stores vaccines rejected by the user
    missedVaccines: [{ type: ObjectId, ref: "Vaccine" }], // Stores missed vaccines
  },
  { timestamps: true }
);
export const UserAnimal = mongoose.model("UserAnimal", userAnimalSchema);
