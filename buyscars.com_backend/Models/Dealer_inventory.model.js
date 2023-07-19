const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    dealerId: { type: String, required: true },
    dealer_full_name: { type: String, required: true },
    deal_title: { type: String },
    vehicle_oem_name: { type: String },
    vehicle_model_name: { type: String, required: true },
    year_of_launch: {
      type: String,
      required: true,
    },
    vehicle_ex_showroom_price: { type: Number, required: true },
    vehicle_available_colors: {
      type: String,
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
    odomoter_reading: { type: Number, required: true },
    major_scrates: { type: Number },
    vehicle_original_paint: {
      type: String,
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
    },
    vehicle_previous_accidents: { type: Number, min: 0 },
    number_of_previous_buyers: { type: Number },
    vehicle_registration_location: { type: String, required: true },
    vehicle_current_location: {
      type: String,
      enum: [
        "Bengaluru",
        "Chennai",
        "Delhi",
        "Mumbai",
        "Pune",
        "Hyderabad",
        "Other",
      ],
      default: "Bengaluru",
    },
    vehicle_dealer_price: { type: Number, min: 0 },
    image: { type: String },
    date_posted: { type: Date, default: Date.now, required: true },
  },
  {
    versionKey: false,
  }
);

const inventoryModel = mongoose.model("dealer_inventory", Schema);

module.exports = { inventoryModel };
