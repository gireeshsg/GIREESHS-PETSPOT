import { useContext, useEffect } from "react";
import { mycontext } from "../Context";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// import { response } from "../../../../Back-end/routes/adminRoute"

export default function AdminEditpetfood() {
  const {petFoodId } = useParams();

  const nav = useNavigate();
  const { petFood, setPetFood } = useContext(mycontext);

  useEffect(() => {
    if (petFoodId) {
      axios
        .get(`http://localhost:5000/admin/petfoods/${petFoodId}`, {
          withCredentials: true,
        })
        .then((response) => {
          setPetFood(response.data.updatedProduct);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [petFoodId, setPetFood]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetFood({
      ...petFood,
      [name]: value,
    });
  };
  
  console.log("products", petFood);
  
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
  
    try {
      // Update the product without token
      const response = await axios.put(
        `http://localhost:5000/admin/petfoods/${petFood}`, // Corrected endpoint
        petFood,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      console.log("Product updated successfully", response.data);
      // Redirect to the product list page or wherever you want after successful update
      alert("Product edit success");
      nav("/adminpetfood");
    } catch (error) {
      console.error("Failed to update product", error.response);
    }
  };
  

  return (
    <div>
      <h1>Edit product</h1>

      <form onSubmit={handleUpdateProduct}>
        <label>category:</label>
        <input
          type="text"
          name="category"
          
          value={petFood.category|| " "}
        
          onChange={handleChange}
        />
          <label>Breed:</label>
        <input
          type="text"
          name="brand"
          
          value={petFood.brand || " "}
        
          onChange={handleChange}
        />

  <label>flavor:</label>
        <input
          type="text"
          name="flavor"
          
          value={petFood.flavor|| " "}
        
          onChange={handleChange}
        />
          <label>quantity:</label>
        <input
          type="text"
          name="quantity"
          
          value={petFood.quantity || " "}
        
          onChange={handleChange}
        />
        <input
          type="text"
          name="quantity"
          
          value={petFood.units || " "}
        
          onChange={handleChange}
        />
        <label>pfooddescription:</label>
        <textarea
          name="pfooddescription"
          value={petFood.pfooddescription|| " "}
          onChange={handleChange}
        />

        <label>Price:</label>
        <input
          type="text"
          name="foodprice"
          value={petFood.foodprice|| " "}
          onChange={handleChange}
        />

        <label>Image URL:</label>
        <input
          type="text"
          name="image"
          value={petFood.image || " "}
          onChange={handleChange}
        />
        <label> detailImage URL:</label>
        <input
          type="text"
          name="detailfoodImage"
          value={petFood.detailfoodImage || " "}
          onChange={handleChange}
        />
        
        <label> nutritionalInfo:</label>
        <input
          type="text"
          name=" nutritionalInfo"
          value={petFood.nutritionalInfo || " "}
          onChange={handleChange}
        />

       

        <button type="submit" onClick={handleUpdateProduct}>Update Product</button>
      </form>
    </div>
  );
}