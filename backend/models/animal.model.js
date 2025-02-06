// import mongoose from "mongoose";
// const { ObjectId } = mongoose.Schema;

// const animalCategorySchema = new mongoose.Schema({
//   animal_type: {
//     type: String,
//     required: true,
//   },
//   breeds: [{ 
//     type: ObjectId, 
//     ref: 'Breed' 
//   }],
// });

// export const AnimalCategory = mongoose.model("AnimalCategory", animalCategorySchema);


import mongoose from "mongoose";

const AnimalCategorySchema = new mongoose.Schema({
  animal_type: { type: String, required: true, unique: true },
  breeds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Breed" }] // Ensure this exists
});

export const AnimalCategory = mongoose.model("AnimalCategory", AnimalCategorySchema);




// import mongoose from "mongoose";


// const breedSchema = new mongoose.Schema({
//   breed_name: {
//     type: String,
//     required: true,
//   },
// });

// const animalCategorySchema = new mongoose.Schema({
//   animal_type: {
//     type: String,
//     required: true,
//   },
//   breeds: [breedSchema], 
// });

// export const AnimalCategory = mongoose.model("AnimalCategory", animalCategorySchema);
