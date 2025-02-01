import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const BreedSchema = new mongoose.Schema({
    breed_name: { type: String, required: true },
    animal_type: {
      type: ObjectId,
      ref: "AnimalCategory",
      required: true,
    },
  });
  
export const Breed = mongoose.model("Breed", BreedSchema);

  
