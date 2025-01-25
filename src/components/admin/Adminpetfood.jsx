import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mycontext } from "../Context";
import axios from "axios";
import "./Adminproduct.css";

export default function Adminpetfoods() {
  const { petFoods, setPetFoods } = useContext(mycontext);
  const nav = useNavigate();

  // Redirect to the Edit page for the selected pet food
  const EditPage = (petFoodId) => {
    nav(`/adminEditPetfood/${petFoodId}`);
  };

  // Delete a pet food item
  const DeleteBtn = async (petFoodId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/admin/petfoods/${petFoodId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setPetFoods((prevFoods) =>
          prevFoods.filter((petFood) => petFood._id !== petFoodId)
        );
      }
    } catch (error) {
      console.error("Error deleting pet food:", error);
    }
  };

  // Fetch pet food items on component mount
 
  useEffect(() => {
    const fetchpetFoods = async () => {
      try {
        const response = await axios.get(
         "http://localhost:5000/admin/petfoods",
          { withCredentials: true }
        );
        setPetFoods(response.data.allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchpetFoods();
  }, [setPetFoods]);

  // Redirect to Add Product page
  const AddProduct = () => {
    nav("/addadminpetfood");
  };

  // Redirect to main page
  const main = () => {
    nav("/");
  };

  return (
    <div className="admin-mainn">
      <div className="admin-sub">
        <h1 className="admin-head">Products Management</h1>
        <button className="admin-button back-button" onClick={main}>Back</button>
        <button className="admin-button add-button" onClick={AddProduct}>Add Product</button>
      </div>
      <div className="admin-body">
        <h2 className="admin-bodyHead">Product List</h2>
        <div className='cardd-container'>
          {petFoods && petFoods.length > 0 ? (
            petFoods.map((petFood) => (
              <div key={petFood._id} className="product-card">
                <div className="product-image-container">
                  <img src={petFood.image} className="product-image" alt={petFood.name} />
                </div>
                <div className="product-details">
                  <h4 className="product-title">{petFood.category}</h4>
                  <h5 className="product-breed">{petFood.brand}</h5>
                  <p className="product-description">{petFood.pfooddescription}</p>
                  <p className="product-color"><strong>Nutritional Info:</strong> {petFood.nutritionalInfo}</p>
                  <h3 className="product-price">${petFood.foodprice}</h3>
                  <div className="product-actions">
                    <button className="action-button edit-button" onClick={() => EditPage(petFood._id)}>Edit</button>
                    <button className="action-button delete-button" onClick={() => DeleteBtn(petFood._id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No pet foods available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
