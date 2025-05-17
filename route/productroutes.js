const express = require('express');
const bodyparser = require("body-parser");
const admin = require('../controller/admin');
const checkAdminToken = require('../middleware/adminmiddleware'); 

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.post("/login", admin.adminLogin);
app.post("/products",  admin.createProduct);
app.get("/products",admin.getProducts);
app.put("/products/:id",  admin.updateProduct);
app.delete("/products/:id",  admin.deleteProduct);
app.get("/products/:id",  admin.getProductById);

app.post('/petfoods',checkAdminToken, admin.createPetfood);
app.get('/petfoods',checkAdminToken, admin.getPetfood);
app.delete('/petfoods/:id', admin.deletePetfood);
app.put("/petfoods/:id", checkAdminToken, admin.updatePetfood);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

module.exports = app;
