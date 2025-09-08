import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js"
import authMIddleware from "../middleware/authMiddleware.js";


const cartRouter = express.Router();

cartRouter.post("/add",authMIddleware,addToCart)
cartRouter.post("/remove",authMIddleware,removeFromCart)
cartRouter.post("/get",authMIddleware,getCart)

export default cartRouter;