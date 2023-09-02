const mongoose = require("mongoose");

const order_schema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    seating: {
      type: Number,
      required: [true, "Seating Capacity is required"],
    },
    contact_number: {
      type: Number,
      required: [true, "Contact Number is required"],
    },
    // border: {
    //   type: String,
    //   required: [true, "Border is required"],
    // },
    tax_mode: {
      type: String,
      required: [true, "Tax Mode is required"],
    },
    tax_type: {
      type: String,
      required: [true, "Tax Type is Required"],
    },
    vehicle_number: {
      type: String
    },
    amount: {
      service_charge: {
        type: Number,
        required: true
      },
      tax:{
        type: Number,
        required: true
      },
      total_amount: {
        type: Number,
        required: true
      }
    },
    start_date: {
      type: String,
      required: [true, "Start Date is required"],
    },
    end_date: {
      type: String,
      required: [true, "End Date is required"],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("order", order_schema);
