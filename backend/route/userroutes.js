const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const multer = require("multer");
const user = require("../controller/user");
const userMiddleware = require("../middleware/usermiddleware");
const adminMiddleware =require("../middleware/adminmiddleware")

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Cookie parser for handling cookies

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Specify your upload directory

// User Authentication Routes
app.post("/register", user.userRegister);
app.post("/login", user.userLogin); // No middleware here
app.post("/update-credentials", userMiddleware, user.updateUserCredentials);

// Request password reset route
app.post("/request-password-reset", user.requestPasswordReset);

// Reset password route
app.post("/reset-password", user.resetPassword);
// Protected Routes (middleware applied)
app.use(userMiddleware); // Apply middleware to all routes below

// Product Routes
app.get("/getProducts", user.userGetProducts);
app.get("/products/:id", user.specificProduct);
app.get("/products/category/:category", user.getCategoryWise);
app.post("/addToCart", user.addToCart);
app.get("/cart", user.getCart);
app.delete("/cart", user.removeFromCart);
app.post("/review/:id", user.getReviewsByProductId);
app.post("/review", user.addReview);
app.delete('/deleteorder/:orderId',user.deleteuserOrder);
// Pet Food Routes
// app.get("/pets",user.getPetsByUserId)
app.get("/addresses",userMiddleware,user.getUserAddresses)
app.post("/ban/:id",user.banUser);
app.post("/unban/:id",user.unbanUser)
app.get("/petfoods/:id", user.specificProductpetfood);
app.get("/petfoods/category/:category", user.getCategoryWisepetfood);
app.post("/addToCartfood", user.addToCartPetFood);
app.get("/cartfood", user.getCart); // Ensure this is a separate route if needed
app.post("/getcomp",user.contact);
// Pet Selling Routes
app.post("/sellnow", upload.single('image'), user.seller); // Endpoint for selling pets with image upload

// Wishlist Routes
app.post("/addToWishlist", user.addToWishlist);
app.get("/wishlist", user.getWishlist);
app.delete("/wishlist", user.removeFromWishlist);
app.post("/addadress",user.addAddress)
app.put("/address/:id", userMiddleware, user.updateAddress);
app.get("/getaddress",user.getUserAddresses)

// Order Management Routes
app.post("/buy", userMiddleware,user.handlePurchase);
app.get("/orders", user.getOrders);
app.delete("/orders/:orderId", user.deleteOrder);
app.get("/getorders", user.handleGetUserOrders);
app.post("/cancelOrder/:orderId", user.cancelOrder);
app.post("/updateAddress", user.handleUpdateAddress);
app.get("/useres",user.getUsers)
app.post("/ban",user.banUser)
app.post("/unban",user.unbanUser)
app.patch("/orders/:orderId/updateStatus",user.updateStatus)
// Unbans a user
app.delete("/address/:addressId",user.deleteAddress)
// User Details Route
app.get("/details", user.userDetails); // Ensure userMiddleware is applied to this route
module.exports = app;
