const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    vehicle_oem_name: { type: String },
    vehicle_model_name: { type: String, required: true },
    year_of_launch: {
      type: String,
      required: true,
    },
    vehicle_ex_showroom_price: { type: Number, required: true },
    vehicle_available_colors: {
      type: [String],
      enum: [
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Black",
        "White",
        "Silver",
        "Gray",
        "Other",
      ],
      required: true,
    },
    vehicle_mileage: { type: Number, min: 0, required: true },
    vehicle_power: { type: Number, min: 0, required: true },
    vehicle_max_speed: { type: Number, min: 0, required: true },
    image: { type: String },
  },
  {
    versionKey: false,
  }
);

const oemModel = mongoose.model("oem_specs", Schema);

module.exports = { oemModel };
