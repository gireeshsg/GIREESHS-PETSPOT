

const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");
const Product = require("../model/productmodel");
const PetFood = require("../model/petfoodmodel")
const Order = require("../model/ordermodel")
const Review =require("../model/reviewmodel")
const Pet = require("../model/sellingmodel")
const seller = async (req, res) => {
  try {
      console.log('Request body:', req.body); // Debugging log

      // Destructure userId from the request body
      const { userId, sellerName, sellerContact, sellerAddress, vaccinationStatus, reasonForSelling, category, breed, gender, size, healthIssues } = req.body;

      // Validate that userId is provided
      if (!userId) {
          return res.status(400).json({ error: 'User ID is required.' });
      }

      // Fetch user info from the database
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Validate required fields
      const requiredFields = [sellerName, sellerContact, sellerAddress, vaccinationStatus, reasonForSelling, category, breed, gender, size, healthIssues];
      for (const field of requiredFields) {
          if (!field) {
              return res.status(400).json({ error: `${field} is required` });
          }
      }

      // Construct pet data
      const petData = {
          userId: user._id, // Use the found user's ID
          sellerName,
          sellerContact,
          sellerAddress,
          vaccinationStatus,
          reasonForSelling,
          category,
          breed,
          gender,
          size,
          healthIssues,
          image: req.file ? req.file.path : '' // Handle optional file upload
      };

      // Create and save a new pet listing
      const newPet = new Pet(petData);
      await newPet.save();

      res.status(201).send('Pet listing created!');
  } catch (error) {
      console.error("Error in seller function:", error);
      res.status(500).json({ error: 'Internal server error' });
  }
};


// Start the server


const userRegister = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).send("Please fill in all fields");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Registration failed");
  }
};
const banUser = async (req, res) => {
  const { email, reason } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      user.isBanned = true; // Mark user as banned
      user.banReason = reason || null; // Set the ban reason
      user.bannedAt = new Date(); // Record the time of banning
      user.unbannedAt = null; // Reset unbanned time
      await user.save(); // Save the changes

      res.status(200).json({ message: 'User banned successfully', user });
  } catch (error) {
      console.error('Error banning user:', error);
      res.status(500).json({ message: 'Error banning user' });
  }
}
const unbanUser = async (req, res) => {
  const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isBanned = false; // Mark user as not banned
        user.banReason = null; // Clear the ban reason
        user.unbannedAt = new Date(); // Record the time of unbanning
        await user.save(); // Save the changes

        res.status(200).json({ message: 'User unbanned successfully', user });
    } catch (error) {
        console.error('Error unbanning user:', error);
        res.status(500).json({ message: 'Error unbanning user' });
    }
}
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Check if user exists and if they are banned
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    if (user.isBanned) {
      return res.status(403).json({ message: 'User is banned. Access denied.' });
    }

    // Verify the password
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1hr",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.setHeader("Authorization", token);

      return res.status(200).json({
        message: "Welcome user",
        token,
        user: { 
          email: user.email, 
          name: user.name, 
          userId: user._id // Include user ID in the response
        }
      });
    } else {
      return res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Login failed");
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email'); // Adjust the fields as needed
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to retrieve users");
  }
};
const updateUserCredentials = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const userId = req.user.id; // Assume user ID is stored in req.user

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Update email if provided
    if (email) {
      user.email = email;
    }

    // Update password if provided
    if (newPassword) {
      user.password = await bcrypt.hash(newPassword, 10); // Hash the new password
    }

    await user.save();
    return res.status(200).json({ message: "Credentials updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Update failed");
  }
};
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send the token via email (implement email sending here)
    await sendEmail(user.email, "Password Reset", `Reset your password using this link: ${process.env.FRONTEND_URL}/reset-password?token=${token}`);

    return res.status(200).json({ message: "Password reset link sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Request failed");
  }
};
const resetPassword = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the header

  if (!token) {
      return res.status(401).json({ message: 'JWT must be provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
          return res.status(401).json({ message: 'Invalid or expired token' });
      }

      const { email, newPassword } = req.body;

      try {
          // Find the user by email
          const user = await User.findOne({ email });
          if (!user) {
              return res.status(404).json({ message: 'User not found' });
          }

          // Hash the new password
          const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 is the salt rounds

          // Update the user's password
          user.password = hashedPassword;
          await user.save();

          return res.status(200).json({ message: 'Password updated successfully' });
      } catch (error) {
          console.error("Error updating password:", error);
          return res.status(500).json({ message: 'Error updating password' });
      }
  });
};
const userGetProducts = async (req, res) => {
  try {
    // Fetch all products
    const allProducts = await Product.find();
    console.log("All Products:", allProducts); // Log all products fetched from the database
   
    // Fetch user's cart items
    // const token = req.cookies.token;
    // if (!token) {
    //   return res.status(401).json({ error: "Unauthorized access" });
    // }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await User.findOne({ email: decoded.email });
    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    // Filter out null or undefined values from user's cart
    // const userCart = user.cart.filter(id => id !== null && id !== undefined).map(id => id.toString());
    // console.log("User Cart:", userCart); // Log user's cart items

    // // Check if each product is in the user's cart
    // const productsWithCartStatus = allProducts.map(product => ({
    //   ...product.toObject(),
    //   inCart: userCart.includes(product._id.toString())
    // }));

    // console.log("Products with Cart Status:", productsWithCartStatus); // Log final products with cart status
    res.status(200).json({ allProducts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", errorMessage: err.message });
  }
};
// Get Products by Category
const getCategoryWise = async (req, res) => {
  const categoryList = req.params.category;
  try {
    const categoryProducts = await Product.find({ category: categoryList });
    res.json(categoryProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get Specific Product

// Get Specific Product
const specificProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ specificProduct: product });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};


// Add to Cart
const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const token = req.cookies.token || req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the product is already in the user's cart
    if (user.cart.includes(productId)) {
      return res.status(200).json({ message: "Product is already in the cart" });
    }

    // Add product to user's cart if it's not already there
    user.cart.push(productId);
    await user.save();

    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", errorMessage: error.message });
  }
};



// Get Cart
const getCart = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email }).populate('cart');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", errorMessage: error.message });
  }
};

// Remove from Cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const token = req.cookies.token || req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if product exists in the user's cart
    const index = user.cart.indexOf(productId);
    if (index === -1) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    // Remove the product from the user's cart
    user.cart.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Product removed from cart", cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", errorMessage: error.message });
  }
};
const handlePurchase = async (req, res) => {
  try {
    const { productId, quantity, addressDetails, paymentMethod } = req.body;

    // Validate required fields for purchase
    if (!productId || quantity <= 0 || !addressDetails || Object.values(addressDetails).some(field => !field) || !paymentMethod) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check for existing address and add if it doesn't exist
    const existingAddress = user.addresses.find(addr => addr.phone === addressDetails.phone);
    if (!existingAddress) {
      const newAddress = { ...addressDetails };
      user.addresses.push(newAddress);
      await user.save();
    }

    // Fetch product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Determine payment status and handle online payment
    let paymentStatus;
    if (paymentMethod === "cash_on_delivery") {
      paymentStatus = "cash-on-delivery";
    } else if (paymentMethod === "online_payment") {
      try {
        // Handle online payment logic here
        paymentStatus = "online-payment-successfully"; // Set based on the payment response
      } catch (paymentError) {
        return res.status(500).json({ error: "Payment processing failed", details: paymentError.message });
      }
    } else {
      return res.status(400).json({ error: `Invalid payment method: ${paymentMethod}` });
    }

    // Create the order
    const order = new Order({
      userId: user._id,
      product: {
        productId: product._id,
        name: product.breed,
        price: product.price,
        category: product.category,
        breed: product.breed,
        size: product.size,
        gender: product.gender,
        color: product.color,
        image: product.image,
        detailImage: product.detailImage,
        about: product.about,
      },
      quantity: Math.max(quantity, 1),
      address: addressDetails,
      status: 'Pending',
      paymentStatus,
      orderDate: new Date(),
    });

    await order.save();

    // Respond with user name, email, and success message
    res.status(200).json({
      message: "Purchase successful!",
      userName: user.name,
      userEmail: user.email // Include user's email in the response
    });
  } catch (err) {
    console.error("Error processing purchase:", err);
    res.status(500).json({ error: "Server error", errorMessage: err.message });
  }
};

const getUserAddresses = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token has expired" });
      }
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ addresses: user.addresses });
  } catch (err) {
    console.error("Error fetching addresses:", err);
    res.status(500).json({ error: "Server error", errorMessage: err.message });
  }
};
const addAddress = async (req, res) => {
  try {
    const { addressDetails } = req.body;
    if (!addressDetails || Object.values(addressDetails).some(field => !field)) {
      return res.status(400).json({ error: "All address fields are required." });
    }

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token has expired" });
      }
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.addresses.push(addressDetails);
    await user.save();

    res.status(200).json({ message: "Address added successfully", address: addressDetails });
  } catch (err) {
    console.error("Error adding address:", err);
    res.status(500).json({ error: "Server error", errorMessage: err.message });
  }
};
const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params; // Extract the address ID from the URL parameter

    // Ensure the addressId is provided
    if (!addressId) {
      return res.status(400).json({ error: "Address ID is required." });
    }

    // Extract token from Authorization header (Bearer <token>)
    const token = req.headers["authorization"]?.split(" ")[1]; // Get token from 'Authorization' header
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access: Token is missing." });
    }

    // Verify and decode the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token using the secret
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token has expired." });
      }
      return res.status(401).json({ error: "Invalid or malformed token." });
    }

    // Find the user based on the decoded token's email
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Find the address to delete in the user's address array
    const addressIndex = user.addresses.findIndex((address) => address._id.toString() === addressId);
    if (addressIndex === -1) {
      return res.status(404).json({ error: "Address not found." });
    }

    // Remove the address from the user's addresses array
    user.addresses.splice(addressIndex, 1);
    await user.save(); // Save the updated user document

    // Send response confirming successful deletion
    return res.status(200).json({ message: "Address deleted successfully." });
  } catch (err) {
    console.error("Error deleting address:", err);
    // Log the error message and return a server error
    return res.status(500).json({ error: "Server error", errorMessage: err.message });
  }
};
const updateAddress = async (req, res) => {
  try {
    const userId = req.user._id; // User ID from the authenticated user
    const addressId = req.params.id; // The address ID passed in the URL
    const { addressDetails } = req.body; // The address details sent by the client

    // Check if address details are provided
    if (!addressDetails || Object.keys(addressDetails).length === 0) {
      return res.status(400).json({ error: "Address details are required" });
    }

    // Fetch the user by userId
    const user = await User.findById(userId);

    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the index of the address in the user's address array
    const addressIndex = user.addresses.findIndex(
      (address) => address._id.toString() === addressId
    );

    // If the address with the given ID is not found, return a 404 error
    if (addressIndex === -1) {
      return res.status(404).json({ error: "Address not found" });
    }

    // Merge the new address details with the existing address
    const updatedAddress = {
      ...user.addresses[addressIndex].toObject(), // Avoid overwriting the MongoDB _id field
      ...addressDetails, // New address details from the client
    };

    // Update the address in the user's address array
    user.addresses[addressIndex] = updatedAddress;

    // Save the updated user document with the new address
    await user.save();

    // Respond with the updated address
    return res.status(200).json({
      message: "Address updated successfully",
      address: updatedAddress,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    return res.status(500).json({ error: "Server error while updating address" });
  }
};



const mongoose = require('mongoose');

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params; // Assuming the order ID is passed as a URL parameter

    // Validate that orderId is provided
    if (!orderId) {
      return res.status(400).json({ error: "Order ID is required." });
    }

    // Validate that orderId is a valid MongoDB ObjectId
    if (!mongoose.isValidObjectId(orderId)) {
      return res.status(400).json({ error: "Invalid Order ID format." });
    }

    // Find and delete the order
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found." });
    }

    res.status(200).json({ message: "Order deleted successfully.", orderId: deletedOrder._id });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ error: "Server error", errorMessage: err.message });
  }
};
const userDetails = async (req, res) => {
  try {
    // Ensure user is authenticated (assuming you're using a middleware to set req.user)
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: No user found." });
    }

    // Check if the user has admin privileges
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Forbidden access: Admins only." });
    }

    // Fetch all users with relevant details
    const users = await User.find()
      .populate('cart')        // Populate cart items
      .populate('wishlist')    // Populate wishlist items
      .populate('addresses')    // Populate addresses
      .select('name email cart wishlist addresses'); // Select specific fields

    // Format the response to include only relevant data
    const userDetails = users.map(user => ({
      id: user._id,            // Include user ID for reference
      name: user.name,
      email: user.email,
      cart: user.cart.map(item => ({ // Format cart items
        id: item._id,
        name: item.name,
        price: item.price,
      })),
      wishlist: user.wishlist.map(item => ({ // Format wishlist items
        id: item._id,
        name: item.name,
      })),
      addresses: user.addresses.map(address => ({ // Format addresses
        id: address._id,
        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
      })),
    }));

    // Send the user details response
    res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

const deleteuserOrder = async (req, res) => {
  try {
      // Retrieve token from cookies or headers
      const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

      if (!token) {
          return res.status(401).json({ error: "Unauthorized access" });
      }

      // Verify token
      let decoded;
      try {
          decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
          return res.status(401).json({ error: "Invalid token" });
      }

      // Find user by email
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      // Get order ID from request parameters
      const orderId = req.params.orderId;
      const order = await Order.findOne({ _id: orderId, userId: user._id });

      if (!order) {
          return res.status(404).json({ error: "Order not found" });
      }

      // Delete the order directly
      await Order.deleteOne({ _id: orderId });
      console.log(`Order ${orderId} deleted from database.`);

      // Send success response
      res.status(200).json({ message: "Order deleted successfully.", orderId });
  } catch (err) {
      console.error("Error deleting order:", err);
      res.status(500).json({ error: "Server error", errorMessage: err.message });
  }
};
const cancelOrder = async (req, res) => {
  try {
      const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

      if (!token) {
          return res.status(401).json({ error: "Unauthorized access" });
      }

      let decoded;
      try {
          decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
          return res.status(401).json({ error: "Invalid token" });
      }

      const user = await User.findOne({ email: decoded.email });
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      const orderId = req.params.orderId;
      const order = await Order.findOne({ _id: orderId, userId: user._id });

      if (!order) {
          return res.status(404).json({ error: "Order not found" });
      }

      // Check if the order has already been canceled
      if (order.canceled) {
          return res.status(400).json({ error: "Order has already been canceled" });
      }

      // Update order status to indicate it has been canceled
      order.status = "Canceled by user";
      order.canceled = true; // Set canceled field
      order.deletable = false; // Mark order as not deletable
      await order.save();

      // Respond with success message and updated order info
      res.status(200).json({ 
          message: "Order has been canceled successfully.", 
          orderId,
          canceled: true, // Indicate the order has been canceled
          orderStatus: order.status // Include current order status
      });
  } catch (err) {
      console.error("Error canceling order:", err);
      res.status(500).json({ error: "Server error", errorMessage: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
      const orders = await Order.find()
          .populate('userId','email name addresses')
          .populate({
              path: 'product.productId',
              select: 'name price category breed image',
          });

      if (!orders || orders.length === 0) {
          return res.status(404).json({ message: "No orders found." });
      }

      const structuredOrders = orders.map(order => ({
          _id: order._id,
          userId: order.userId,
          product: order.product,
          quantity: order.quantity,
          status: order.status === 'Canceled by user' 
              ? 'Canceled! 📦' 
              : order.status === 'User deleted the order' 
                  ? 'Order Deleted by User 🗑️' 
                  : order.status,
          paymentStatus: order.paymentStatus,
          orderDate: order.orderDate,
          address: order.address,
      }));

      res.status(200).json({
          message: "Orders retrieved successfully.",
          orders: structuredOrders,
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({
          error: "Server error",
          errorMessage: err.message,
      });
  }
};


// const userGetPetFood = async (req, res) => {
//   try {
//     const {email}=req.body
//     // Fetch all pet foods
//     const allProducts = await PetFood.find();
//     console.log("All Pet Foods:", allProducts);

//     // Accessing the token from headers
//     // const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

//     // console.log("Token:", token);

//     // if (!token) {
//     //   return res.status(401).json({ error: "Unauthorized access: No token provided" });
//     // }

//     // let decoded;
//     // try {
//     //   decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // } catch (error) {
//     //   return res.status(401).json({ error: "Invalid token" });
//     // }

//     // Use the email from the request body (if it's sent that way)
//     const user = await User.findOne({email:email});

//     console.log("User logged:", req.body);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Get user's cart
//     const userCart = user.cart.filter(id => id !== null && id !== undefined).map(id => id.toString());
//     console.log("User Cart:", userCart);

//     // Map pet foods to include cart status
//     const petFoodsWithCartStatus = allProducts.map(petFood => ({
//       ...petFood.toObject(),
//       inCart: userCart.includes(petFood._id.toString())
//     }));

//     console.log("Pet Foods with Cart Status:", petFoodsWithCartStatus);
//     res.status(200).json({ allPetFoods: petFoodsWithCartStatus });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error", errorMessage: err.message });
//   }
// };

// Get Products by Category
const getCategoryWisepetfood = async (req, res) => {
  const categoryList = req.params.category;
  try {
    const categoryProducts = await PetFood.find({ category: categoryList });
    res.json(categoryProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Get Specific Product
const specificProductpetfood = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ specificProduct: product });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};
const addToCartPetFood = async (req, res) => {
  try {
    const { petFoodId } = req.body;

    const token = req.cookies.token || req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const petFood = await PetFood.findById(petFoodId);
    if (!petFood) {
      return res.status(404).json({ error: "Pet food not found" });
    }

    if (user.cart.includes(petFoodId)) {
      return res.status(200).json({ message: "Pet food is already in the cart" });
    }

    user.cart.push(petFoodId);
    await user.save();

    res.status(200).json({ message: "Pet food added to cart", cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", errorMessage: error.message });
  }
};



// Get Cart
const getCartfood = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email }).populate('cart');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", errorMessage: error.message });
  }
};

// Remove from Cart
// const removeFromCartPetFood = async (req, res) => {
//   try {
//     const { petFoodId } = req.body;

//     const token = req.cookies.token || req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized access" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ email: decoded.email });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const index = user.cart.indexOf(petFoodId);
//     if (index === -1) {
//       return res.status(404).json({ error: "Pet food not found in cart" });
//     }

//     user.cart.splice(index, 1);
//     await user.save();

//     res.status(200).json({ message: "Pet food removed from cart", cart: user.cart });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error", errorMessage: error.message });
//   }
// };


// const userDetailsfood = async (req, res) => {
//   try {
//     const token = req.headers.authorization;
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized access" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ email: decoded.email }).populate('cart');

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error", errorMessage: error.message });
//   }
// };

// // Add to Cart
// Add to Wishlist
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const token = req.cookies.token || req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Initialize wishlist if it doesn't exist
    if (!user.wishlist) {
      user.wishlist = [];
    }

    // Check if the product is already in the wishlist
    if (user.wishlist.includes(productId)) {
      return res.status(409).json({ error: "Product already in wishlist" });
    }

    // Add product to user's wishlist
    user.wishlist.push(productId);
    await user.save();

    res.status(200).json({ message: "Product added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", errorMessage: error.message });
  }
};


// Get Wishlist
const getWishlist = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email }).populate('wishlist');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", errorMessage: error.message });
  }
};

// Remove from Wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const token = req.cookies.token || req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if product exists in the user's wishlist
    const index = user.wishlist.indexOf(productId);
    if (index === -1) {
      return res.status(404).json({ error: "Product not found in wishlist" });
    }

 
    user.wishlist.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Product removed from wishlist", wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error", errorMessage: error.message });
  }
};
const handleGetUserOrders = async (req, res) => {
  try {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const orders = await Order.find({ userId: user._id }) 
      .populate('product.productId', 'image category breed price')
      .populate('userId', 'email name addresses');

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user." });
    }

    const formattedOrders = orders.map(order => ({
      orderId: order._id,
      deliveryDate: order.deliveryDate,
      orderDate: order.orderDate,
      productImage: order.product.image,
      productCategory: order.product.category,
      productBreed: order.product.breed,
      productPrice: order.product.price,
      userEmail: user.email,
      userName: user.name,
      address: order.address,
      status: order.status === 'Canceled' 
        ? 'Canceled! 📦' 
        : order.status === 'User deleted the order' 
          ? 'Order Deleted by User 🗑️' 
          : order.status // Include other statuses as needed
    }));

    res.status(200).json({ orders: formattedOrders });
  } catch (err) {
    console.error("Error retrieving user orders:", err);
    res.status(500).json({ error: "Server error", errorMessage: err.message });
  }
};
const updateStatus = async (req, res) => {
try {
  const { orderId } = req.params;
  const { status } = req.body;

  // Check if the status is valid
  const validStatuses = ['Shipped', 'Out of Delivery', 'Delivered'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  // Update the status
  order.status = status;
  await order.save();

  res.status(200).json({
    message: 'Order status updated successfully',
    order: order,
  });
} catch (err) {
  console.error('Error updating order status:', err);
  res.status(500).json({ error: 'Server error', errorMessage: err.message });
}
}

const addReview = async (req, res) => {
  const { productId, username, rating, comment } = req.body;

  try {
    const newReview = new Review({ productId, username, rating, comment });
    await newReview.save();
    return res.status(201).json(newReview);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Function to get reviews by product ID
const getReviewsByProductId = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ productId });
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const handleUpdateAddress = async (req, res) => {
  const { orderId, addressDetails } = req.body;

  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }


    order.address = addressDetails; 
    await order.save();

    res.status(200).json({ message: "Address updated successfully." });
  } catch (err) {
    console.error("Error updating address:", err);
    res.status(500).json({ error: "Server error", errorMessage: err.message });
  }
};

// Endpoint to submit a complaint with JWT authentication
const contact = async (req, res) => {
  try {
    // Extract token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    // Verify token
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token has expired" });
      }
      return res.status(401).json({ error: "Invalid token" });
    }

    // If the token is valid, proceed to handle the complaint submission
    const { name, email, subject, message } = req.body;

    // Validate complaint data
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Send email with the complaint details using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    const mailOptions = {
      from: email,
      to: 'your-email@gmail.com', // Complaint will be sent to this email
      subject: `Complaint from ${name}: ${subject}`,
      text: `Complaint Message:\n\n${message}\n\nContact Information:\nName: ${name}\nEmail: ${email}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to send complaint.' });
      }
      return res.status(200).json({ success: 'Complaint submitted successfully!' });
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while processing your complaint.' });
  }
}

// Start the server


module.exports = {
  userRegister,
  contact,
  userLogin,
  userGetProducts,
  specificProduct,
  addToCart,
  getCategoryWise,
  getCart,
  removeFromCart,
  
  getCategoryWisepetfood,
updateUserCredentials,
resetPassword,
requestPasswordReset,
  specificProductpetfood,
  addToCartPetFood,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  handlePurchase,
getOrders,
deleteOrder,
getUsers,
seller,
addAddress,
updateAddress,
handleGetUserOrders,
cancelOrder,
handleUpdateAddress,
userDetails,
addReview,
getReviewsByProductId,
updateStatus,
 banUser,
 unbanUser,
 deleteuserOrder,
 getUserAddresses,
 deleteAddress,
};


// const handlePurchase = async (req, res) => {
//   try {
//     // Extract token from headers
//     const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized access: No token provided" });
//     }

//     // Decode the token to get user email
//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (error) {
//       return res.status(401).json({ error: "Invalid token" });
//     }

//     const email = decoded.email; // Assuming the email is part of the decoded token

//     const { productId, quantity, addressDetails, paymentMethod } = req.body;

//     // Validate required fields for purchase
//     if (!productId) {
//       return res.status(400).json({ error: "Product ID is required." });
//     }
//     if (quantity <= 0) {
//       return res.status(400).json({ error: "Quantity must be greater than 0." });
//     }
//     if (!addressDetails || Object.values(addressDetails).some(field => !field)) {
//       return res.status(400).json({ error: "All address fields are required." });
//     }
//     if (!paymentMethod) {
//       return res.status(400).json({ error: "Payment method is required." });
//     }

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Check if product exists and has enough stock
//     const product = await Product.findById(productId);
//     if (!product || product.stock < quantity) {
//       return res.status(400).json({ error: "Product not available or insufficient stock." });
//     }

//     // Calculate total price
//     const totalPrice = product.price * quantity;

//     // Process payment (replace with actual payment processing logic)
//     let paymentSuccessful = false;
//     if (paymentMethod === 'cash') {
//       // Cash on delivery logic (payment is considered successful)
//       paymentSuccessful = true;
//     } else if (paymentMethod === 'card') {
//       // Here you would integrate with a payment gateway (like Stripe, PayPal, etc.)
//       // For now, we simulate a successful payment
//       paymentSuccessful = true; // Simulate a successful card payment
//     }

//     if (!paymentSuccessful) {
//       return res.status(400).json({ error: "Payment failed. Please try again." });
//     }

//     // Create new address object
//     const newAddress = {
//       pincode: addressDetails.pincode,
//       locality: addressDetails.locality,
//       address: addressDetails.address,
//       city: addressDetails.city,
//       state: addressDetails.state,
//       landmark: addressDetails.landmark,
//       addressType: addressDetails.addressType,
//       phone: addressDetails.phone,
//     };

//     // Add address to user's addresses array
//     user.addresses.push(newAddress);
//     await user.save();

//     // Deduct stock from the product
//     product.stock -= quantity;
//     await product.save();

//     // Optionally, you can create an order entry in an Order collection
//     const order = new Order({
//       user: user._id,
//       product: productId,
//       quantity,
//       totalPrice,
//       address: newAddress,
//       paymentMethod,
//     });
//     await order.save();

//     // Notify admin (optional - could be an event, or a separate logic)
//     // Example: notifyAdmin(order);

//     res.status(200).json({ message: "Purchase successful!", totalPrice });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error", errorMessage: err.message });
//   }
