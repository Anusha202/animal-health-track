// import mongoose from "mongoose";
// const { ObjectId } = mongoose.Schema;

// const BreedSchema = new mongoose.Schema({
//     breed_name: { type: String, required: true },
//     animal_type: {
//       type: ObjectId,
//       ref: "AnimalCategory",
//       required: true,
//     },
//   });
  
// export const Breed = mongoose.model("Breed", BreedSchema);

import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

// Define the Breed schema
const BreedSchema = new mongoose.Schema({
  breed_name: { type: String, required: true },
  animal_type: {
    type: ObjectId, // This defines it as an ObjectId reference
    ref: "AnimalCategory", // This links to the AnimalCategory collection
    required: true,
  },
});

// Export the model using the Breed schema
export const Breed = mongoose.model("Breed", BreedSchema);


  
