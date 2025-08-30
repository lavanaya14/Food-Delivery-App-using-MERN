// // // import orderModel from "../models/orderModel.js";
// // // import userModel from "../models/userModel.js"
// // // import Stripe from "stripe"

// // // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// // // console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);


// // // //placing user order for frontend
// // // const placeOrder = async(req,res)=>{

// // //     const frontend_url = "http://localhost:5173"

// // //     try {
// // //         const newOrder = new orderModel({
// // //             userId:req.body.userId,
// // //             items:req.body.items,
// // //             amount:req.body.amount,
// // //             address:req.body.address
// // //         })
// // //         await newOrder.save();
// // //         await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

// // //         const line_items = req.body.items.map((item)=>({
// // //             price_data:{
// // //                 currency:"inr",
// // //                 product_data:{
// // //                     name:item.name,
// // //                 },
// // //                 unit_amount:item.price*100
// // //             },
// // //             quantity:item.quantity,
// // //         }));
// // //         line_items.push({
// // //             price_data:{
// // //                 currency:"inr",
// // //                 product_data:{
// // //                     name:"Delivery Charges"
// // //                 },
// // //                  unit_amount:2*100,
// // //             },
// // //             quantity:1
// // //         });

// // //         const session = await stripe.checkout.sessions.create({
// // //             line_items:line_items,
// // //             mode:'payment',
// // //             success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
// // //             cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
// // //         })

// // //         res.json({success:true,session_url:session.url})
// // //     } catch (error) {
// // //         console.log(error)
// // //         res.json({success:false,message:"Error"})
// // //     }
// // // }

// // // export{placeOrder}





// // import Stripe from "stripe";
// // import dotenv from "dotenv";



// // dotenv.config();

// // // initialize Stripe with your secret key
// // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // export const createCheckoutSession = async (req, res) => {
// //   try {
// //     const { items, amount, address } = req.body;

// //     // 🔹 convert your items into Stripe line_items
// //     const line_items = items.map((item) => ({
// //       price_data: {
// //         currency: "usd",
// //         product_data: {
// //           name: item.name,
// //         },
// //         unit_amount: item.price * 100, // cents
// //       },
// //       quantity: item.quantity,
// //     }));

// //     const session = await stripe.checkout.sessions.create({
// //       payment_method_types: ["card"],
// //       mode: "payment",
// //       line_items: cartItems.map((item) => ({
// //         price_data: {
// //           currency: "usd",
// //           product_data: { name: item.name },
// //           unit_amount: item.price * 100, // price in cents
// //         },
// //         quantity: item.quantity,
// //       })),
// //       success_url: "http://localhost:5173/success", 
// //       cancel_url: "http://localhost:5173/cancel",   
// //     });

// //     // send session URL to frontend
// //     res.json({ success: true, session_url: session.url });
// //   } catch (error) {
// //     console.error("Stripe Checkout Error:", error);
// //     res.status(500).json({ success: false, error: error.message });
// //   }
// // };




// // // import Stripe from "stripe";
// // // import dotenv from "dotenv";

// // // dotenv.config();

// // // // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // // export const createCheckoutSession = async (req, res) => {
// // //   try {
// // //     const { cartItems } = req.body;

// // //     if (!cartItems || cartItems.length === 0) {
// // //       return res.status(400).json({ error: "Cart is empty" });
// // //     }

// // //     const line_items = cartItems.map((item) => ({
// // //       price_data: {
// // //         currency: "usd",
// // //         product_data: {
// // //           name: item.name,
// // //         },
// // //         unit_amount: Math.round(item.price * 100), // cents
// // //       },
// // //       quantity: item.quantity,
// // //     }));

// // //     const session = await stripe.checkout.sessions.create({
// // //       payment_method_types: ["card"],
// // //       mode: "payment",
// // //       line_items,
// // //       success_url: "http://localhost:5173/success", // ✅ FULL URL REQUIRED
// // //       cancel_url: "http://localhost:5173/cancel",   // ✅ FULL URL REQUIRED
// // //     });

// // //     res.json({ id: session.id, url: session.url });
// // //   } catch (error) {
// // //     console.error("Stripe Checkout Error:", error);
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // };




// // // import express from "express";
// // // import Stripe from "stripe";

// // // const router = express.Router();
// // // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// // // // const stripe = new Stripe("sk_test_xxx"); // ⚠️ Apna Stripe Secret Key yahan dalna

// // // router.post("/checkout", async (req, res) => {
// // //   try {
// // //     const { items, amount, address } = req.body;

// // //     // Stripe ke line items banate hain
// // //     const line_items = items.map((item) => ({
// // //       price_data: {
// // //         currency: "usd", // INR bhi use kar sakte ho
// // //         product_data: {
// // //           name: item.name,
// // //         },
// // //         unit_amount: item.price * 100, // Stripe cents me leta hai
// // //       },
// // //       quantity: item.quantity,
// // //     }));

// // //     // Checkout Session create
// // //     const session = await stripe.checkout.sessions.create({
// // //       payment_method_types: ["card"],
// // //       line_items,
// // //       mode: "payment",
// // //       success_url: "http://localhost:4000/success", // ✅ frontend success page
// // //       cancel_url: "http://localhost:4000/cancel",   // ❌ cancel page
// // //       shipping_address_collection: {
// // //         allowed_countries: ["IN", "US"], // Allowed countries
// // //       },
// // //       metadata: {
// // //         customerName: `${address.firstName} ${address.lastName}`,
// // //         email: address.email,
// // //         phone: address.phone,
// // //       },
// // //     });

// // //     res.json({ success: true, session_url: session.url });
// // //   } catch (error) {
// // //     console.error("Stripe Checkout Error:", error.message);
// // //     res.status(500).json({ success: false, message: "Payment failed" });
// // //   }
// // // });

// // export default router;



// // backend/controllers/orderController.js

// // Place a new order


// export const placeOrder = async (req, res) => {
//   try {
//     const { userId, items, totalAmount, paymentMethod } = req.body;

//     if (!userId || !items || items.length === 0 || !totalAmount) {
//       return res.status(400).json({ message: "Invalid order data" });
//     }

//     // In real case: Save to DB (MongoDB / SQL)
//     const newOrder = {
//       id: Date.now(), // fake ID (replace with DB generated ID)
//       userId,
//       items,
//       totalAmount,
//       paymentMethod,
//       status: "Pending",
//       createdAt: new Date(),
//     };

//     // Mock response (replace with DB save)
//     res.status(201).json({
//       message: "Order placed successfully",
//       order: newOrder,
//     });
//   } catch (error) {
//     console.error("Error placing order:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Get all orders (Admin only)
// export const getAllOrders = async (req, res) => {
//   try {
//     // Replace with DB call
//     const orders = [
//       { id: 1, userId: "123", totalAmount: 500, status: "Pending" },
//       { id: 2, userId: "456", totalAmount: 1200, status: "Delivered" },
//     ];

//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Get single order by ID
// export const getOrderById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Replace with DB fetch
//     const order = { id, userId: "123", totalAmount: 500, status: "Pending" };

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     res.status(200).json(order);
//   } catch (error) {
//     console.error("Error fetching order:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // Update order status
// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     if (!status) {
//       return res.status(400).json({ message: "Status is required" });
//     }

//     // Replace with DB update
//     const updatedOrder = { id, status };

//     res.status(200).json({
//       message: "Order status updated successfully",
//       order: updatedOrder,
//     });
//   } catch (error) {
//     console.error("Error updating order:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };




// backend/controllers/orderController.js
import Order from "../models/orderModel.js";

// Place new order
export const placeOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, paymentMethod } = req.body;

    if (!userId || !items || items.length === 0 || !totalAmount) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      paymentMethod,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all orders (Admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single order by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("userId", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// export{placeOrder}