import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const animalCategorySchema = new mongoose.Schema({
  animal_type: {
    type: String,
    required: true,
  },
  breeds: [{ 
    type: ObjectId, 
    ref: 'Breed' 
  }],
});

export const AnimalCategory = mongoose.model("AnimalCategory", animalCategorySchema);



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
