// import userModel from "../models/userModel.js";
// import jwt from "jsonwebtoken"
// import bcrypt from "bcrypt"
// import validator from "validator"


// // // login User
// // const loginUser = async (req, res) => {
// //     const {email,password} = req.body;
// //     try {
// //         const user = await userModel.findOne({email});

// //         if (!user) {
// //             return res.json({success:false,message:"User Doesn't exist"})
// //         }

// //         const isMatch = await bcrypt.compare(password,user.password);
// //         if(!isMatch){
// //             return res.json({success:false,message:"invalid credentials"})
// //         }

// //         const token = createToken(user._id);
// //         res.json({success:true,token})
// //     }
// //  catch (error) {
// //        console.log(error)
// //        res.json({success:false,message:"Error"}) 
// //     }
// //  }


// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // 1. Check if user exists
//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.json({ success: false, message: "User doesn't exist" });
//     }

//     // 2. Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.json({ success: false, message: "Invalid credentials" });
//     }

//     // 3. Generate JWT token
//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,   // make sure this is defined in .env
//       { expiresIn: "1d" }
//     );

//     // 4. Send response
//     return res.json({success: true,token});

//   }
//    catch (err) {
//     console.error("Login Error:", err);
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };

// const createToken = (id)=>{
//     return jwt.sign({id},process.env.JWT_SECRET)
// }

// //register User
// const registerUser = async (req, res) => {
//     const {name,password,email} = req.body;
//     try {
//         //checking if user already exists
//         const exists = await userModel.findOne({email});
//         if(exists){
//             return res.json({success:false,message:"User already exist"})
//         }

//         //validating email format and strong password
//         if(!validator.isEmail(email)){
//             return res.json({success:false,message:"Please enter Valid email"})
//         }

//         if(password.length<8){
//             return res.json({success:false,message:"please enter a strong password"})
//         }

//         //hashing user password
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password,salt);

//         const newUser = new userModel({
//             name:name,
//             email:email,
//             password:hashedPassword
//         })

//         const user = await newUser.save()
//          const token = createToken(user._id)
//          res.json({success:true,token});

//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
        
//     }
// }

// export { loginUser, registerUser }


import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// 🔑 Token create helper
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// 🟢 Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // 1. Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // 2. Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" });
    }

    // 3. Validate password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // 4. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Save user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // 6. Generate token
    const token = createToken(user._id);

    return res.json({ success: true, token });
  } catch (error) {
    console.error("Register Error:", error);
    return res.json({ success: false, message: "Error while registering" });
  }
};

// 🔵 Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // 3. Generate token
    const token = createToken(user._id);

    // 4. Send response
    return res.json({ success: true, token });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ success: false, message: "Error while login" });
  }
};

export { loginUser, registerUser };
