// import mongoose from "mongoose"

// const orderSchema = new mongoose.Schema({
//     userId:{type:String,required:true},
//     items:{type:Array,required:true},
//     amount:{type:Number,required:true},
//     address:{type:Object,required:true},
//     status:{type:String,default:"Food Processing"},
//     date:{type:Date,default:Date.now()},
//     payment:{type:Boolean,default:false}
// })

// const orderModel = mongoose.models.order || mongoose.model("order",orderSchema)
// export default orderModel;


import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      name: String,
      price: Number,
      qty: Number,
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
