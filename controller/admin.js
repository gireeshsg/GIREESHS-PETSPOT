

const Product = require('../model/productmodel');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs') 
const schema = require("../model/usermodel"); 
const PetFood =require("../model/petfoodmodel");
const { all } = require('../route/userroutes');
const Orderr =require("../model/ordermodel");
const User =require("../model/usermodel")


const adminLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (email !== "admin@gmail.com" || password !== "admin123") {
      throw new Error("Invalid Email or Password");
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });
    res.cookie("token", token, { httpOnly: true, secure: false });
    res.setHeader("Authorization", token);

    res.json({ message: "welcome, Admin", token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const createPetfood = async (req, res) => {
  try {
    await PetFood.insertMany([
      {
      category: req.body.category,
      brand: req.body.brand,
      flavor: req.body.flavor,
      quantity: req.body.quantity,
      nutritionalInfo: req.body.nutritionalInfo,
      pfooddescription: req.body.pfooddescription,
      foodprice: req.body.foodprice,
      image: req.body.image,
      detailfoodImage:req.body.detailfoodImage,
      units: req.body.units,
      stock: req.body.stock,
      availability: req.body.stock > 0, // Set availability based on stock
      soldOut: req.body.stock === 0, 
    },
  ]);

    res.status(200).json({ message: "Product Create Successfully" });
    console.log("product create successfully");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create Product", error: error.message });
  }
};

const getPetfood = async (req, res) => {
  try {
    const allProducts = await PetFood.find();
    res.status(200).json({ message: "All Product List", allProducts});
  } catch (error) {
    res
      .status(404)
      .json({ message: "All Product List Not Found: ", error: error.message });
    console.log(error);
  }
};


const updatePetfood = async (req, res) => {
 

  try {
    const id = req.params.id;

    const { category, brand, flavor, quantity,nutritionalInfo, pfooddescription, foodprice, image, detailfoodImage, units, stock } = req.body;

    const updatedProduct = await PetFood.findOneAndUpdate(
      { _id: id },
      {
        category,
        brand,
        color,
        flavor,
        quantity,
        nutritionalInfo,
        foodprice,
        pfooddescription,
        detailfoodImage,
        units,
        stock,
        image,
        availability: stock > 0, // Update availability based on stock
        soldOut: stock === 0, // Update soldOut based on stock
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated", updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product" });
  }
};
const deletePetfood = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await PetFood.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
const createProduct = async (req, res) => {
  try {
    const newProduct = {
      category: req.body.category,
      breed: req.body.breed,
      color: req.body.color,
      gender: req.body.gender,
      about: req.body.about,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      detailImage: req.body.detailImage,
      size: req.body.size,
      petcount: req.body.petcount,
      stock: req.body.stock,
      availability: req.body.stock > 0, // Set availability based on stock
      soldOut: req.body.stock === 0, // Set soldOut based on stock
    };

    await Product.insertMany([newProduct]);

    res.status(200).json({ message: "Product created successfully" });
    console.log("Product created successfully");
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json({ message: "All products list", allProducts });
  } catch (error) {
    console.error("Error fetching products:", error); // Log the error for debugging
    res.status(500).json({ message: "All product list not found", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    
    const {
      category,
      breed,
      color,
      gender,
      about,
      description,
      price,
      image,
      detailImage,
      size,
      petcount,
      stock,
    } = req.body;

    // Validate input fields if necessary
    if (!id || !category || !breed || !price) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        category,
        breed,
        color,
        gender,
        about,
        description,
        price,
        image,
        detailImage,
        size,
        petcount,
        stock,
        availability: stock > 0,
        soldOut: stock === 0,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated", updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error); // Log the error for debugging
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product found", product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};

// Export the functions if needed


module.exports = {
getProductById,
  adminLogin,
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  createPetfood,
  deletePetfood,
  updatePetfood,
  getPetfood,
 
};



