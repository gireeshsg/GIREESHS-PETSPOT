import { useContext } from "react";
import { mycontext } from "../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 import "./AdminAddProduct.css"

export default function AdminAddPetfood() {
  const nav = useNavigate();
  const { petFood, setPetFood } = useContext(mycontext);

  const tokenn=localStorage.getItem("adminToken")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetFood({
      ...petFood,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tokenn) {
      console.error("Token not available. Please log in as an admin.");
      return;
    }
  
    // Convert foodprice to a number if it's a valid string
    const formattedPetFood = {
      ...petFood,
      foodprice: parseFloat(petFood.foodprice), // Convert to a number
    };
  
    // Check for required fields
    if (isNaN(formattedPetFood.foodprice) || formattedPetFood.foodprice <= 0) {
      alert("Please provide a valid food price.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/petfoods",
        formattedPetFood,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${tokenn}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Product added successfully");
      nav('/adminpetfood');
      console.log("Product created successfully", response.data);
    } catch (error) {
      console.error("Failed to create product", error.response);
      alert("Failed to create product");
    }
  };
  
  return (
    <div className="add-product-main">
      <h1 className="add-product-head">Add Product</h1>

      <form onSubmit={handleSubmit}>
        <label className="labell">category:</label>
        <input
        className="inputt"
          type="text"
          name="category"
          value={petFood.category}
          onChange={handleChange}
        />

        <label className="labell">Brand:</label>
        <input
         className="inputt"
          type="text"
          name="brand"
          value={petFood.brand}
          onChange={handleChange}
        />

        <label className="labell">Flavour:</label>
        <input
         className="inputt"
          type="text"
          name="flavor"
          value={petFood.flavor}
          onChange={handleChange}
        />

        <label className="labell">Quantity:</label>
        <input
         className="inputt"
          type="text"
          name= "quantity"
          value={petFood.quantity}
          onChange={handleChange}
        /> <label className="labell">Units:</label>
        <input
         className="inputt"
          type="text"
          name= "units"
          value={petFood.units}
          onChange={handleChange}
        />

        <label className="labell">Description:</label>
        <textarea
         className="textareaa"
          name="pfooddescription"
          value={petFood.pfooddescription}
          onChange={handleChange}
        />

        <label className="labell">foodPrice:</label>
        <input
         className="inputt"
          type="text"
          name="foodprice"
          value={petFood.foodprice}
          onChange={handleChange}
        />

        <label className="labell">Image URL:</label>
        <input
         className="inputt"
          type="text"
          name="image"
          value={petFood.image}
          onChange={handleChange}
        />

<label className="labell">Detail Image URL:</label>
<input
    className="inputt"
    type="text"
    name="detailfoodImage"
    value={petFood.detailfoodImage}
    onChange={handleChange}
/>
        <label className="labell">nutritionalInfo</label>
        <textarea
         className="inputt"
          type="text"
          name="nutritionalInfo"
          value={petFood.nutritionalInfo}
          onChange={handleChange}
        />  
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
