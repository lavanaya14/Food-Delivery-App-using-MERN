// import userModel from "../models/userModel.js";

// //add item to user cart
// const addToCart = async(req,res)=>{
//     try {
//         let userData = await userModel.findById(req.body.userId);
//         let cartData = userData.cartData;
//         if(!cartData[req.body.itemId]){
//             cartData[req.body.itemId] = 1;
//         }
//         else{
//             cartData[req.body.itemId] += 1;
//         }
//         await userModel.findByIdAndUpdate(req.userId,{cartData});
//         res.json({success:true,message:"Added to cart"});
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }

// //remove items from user cart
// const removeFromCart = async(req,res)=>{
//     try {
//         let userData = await userModel.findById(req.userId);
//         let cartData =  userData.cartData;
//         if(cartData[req.body.itemId]>0){
//             cartData[req.body.itemId] -= 1;
//         }
//         await userModel.findByIdAndUpdate(req.userId,{cartData});
//         res.json({success:true,message:"Removed From Cart"})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }

// //fetch user cart data
// const getCart = async(req,res)=>{
//     try {
//         let userData = await userModel.findById(req.userId);
//         let cartData =  userData.cartData;
//         res.json({success:true,cartData})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }   



// export{addToCart, removeFromCart, getCart}





import userModel from "../models/userModel.js";

// Add item to user cart
const addToCart = async (req, res) => {
  try {
    const userId = req.userId;  
    const { itemId } = req.body;

    console.log("Adding to cart - User:", userId, "Item:", itemId);

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    console.log("Updated cartData:", cartData);

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.json({ success: true, message: "Added to cart", cartData });
  } catch (error) {
    console.error("AddToCart Error:", error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    console.log("Removing from cart - User:", userId, "Item:", itemId);

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    console.log("Updated cartData:", cartData);

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.json({ success: true, message: "Removed From Cart", cartData });
  } catch (error) {
    console.error("RemoveFromCart Error:", error);
    res.json({ success: false, message: "Error" });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("Fetching cart for User:", userId);

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.error("GetCart Error:", error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };
