import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  qty: {
    type: Number,
    required: true,
  },

  discount: {
    type: Number,
    default: 0,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [orderItemSchema],

    total: {
      type: Number,
      required: true,
    },

    OptionPayment: {
      type: String,
      enum: ["cash", "qr"],
      default: "cash",
    },

    status: {
      type: String,
      enum: ["PAID", "CANCELLED"],
      default: "PAID",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", orderSchema);
