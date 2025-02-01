import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const WeeklyReportSchema = new mongoose.Schema({
  animal: {
    type: ObjectId,
    ref: 'UserAnimal',
    required: true,
  },
  weekStart: {
    type: Date,
    required: true,
  },
  weekEnd: {
    type: Date,
    required: true,
  },
  reportData: {
    healthStatus: {
      type: String,
      required: true,
    },
    abnormalCount: {
      type: Number,
      required: true,
    },
    avgTemperature: {
      type: Number,
      required: true,
    },
    avgProduction: {
      type: Number, // For milk or egg production
      // required: animalType !== 'Dog', // Conditional based on the animal type
    },
    avgWeight: {
      type: Number,
      required: true,
    },
  },
});

const WeeklyReport = mongoose.model('WeeklyReport', WeeklyReportSchema);

export default WeeklyReport;
