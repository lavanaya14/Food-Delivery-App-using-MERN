// // import jwt from "jsonwebtoken"

// // const authMIddleware = async (req, res, next) => {
// //     const { token } = req.headers;
// //     if (!token) {
// //         return res.json({ success: false, message: "Not Authorized Login Again" })
// //     }
// //     try {
// //         const token_decode = jwt.verify(token,process.env.JWT_SECRET);
// //         req.body.userId = token_decode.id;
// //         next();
// //     } catch (error) {
// //         console.log(error);
// //         // console.error("JWT verify failed:", error.message);
// //         res.json({success:false,message:"Error"})
// //     }

// // }

// // export default authMIddleware;







// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//   try {
//     const token = req.headers.token;
//     if (!token) {
//       return res.json({ success: false, message: "No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id;  
//     next();
//   } catch (err) {
//     return res.json({ success: false, message: "Invalid or expired token" });
//   }
// };

// export default authMiddleware;





import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // attach userId to request
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;
