import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const benchmarkSchema = new mongoose.Schema(
  {
    animalType: { type: String, required: true },
    breed: { type: String, required: true },
    // size: { type: String,  },
    weight: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    // height_at_wither: { type: String, required: true },
    lifespan: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    average_temperature: { type: Number, required: true },
    age_data: [
      {
        age_range: {
          min: { type: Number, required: true },
          max: { type: Number, required: true },
        },
        weight_range: {
          min: { type: Number, required: true },
          max: { type: Number, required: true },
        },
        milk_per_day: {
          min: { type: Number, required: true },
          max: { type: Number, required: true },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)
export const Benchmark = mongoose.model("Benchmark", benchmarkSchema);
