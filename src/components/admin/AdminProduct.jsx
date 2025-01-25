import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mycontext } from "../Context";
import axios from "axios";
import "./Adminproduct.css";

export default function AdminProducts() {
  const { products, setProducts } = useContext(mycontext);

  const nav = useNavigate();

  function EditPage(productId) {
    nav(`/adminEditProduct/${productId}`);
    console.log("edit button :", productId);
  }

  const DeleteBtn = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/admin/products/${productId}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      }
    } catch (error) {
      console.error("Erro deleting product", error);
    }
  };

  useEffect(() => {
    // Fetch products when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/products",
          {
            withCredentials: true,
          }
        ); // Replace with your actual API endpoint
        setProducts(response.data.allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  console.log("fetch products", products);

  function AddProduct() {
    nav("/addProduct");
  }
  function Back() {
    nav("/main");
  }
  return (
    <div className="admin-mainn">
      <div className="admin-sub">
        <h1 className="admin-head">Products Management</h1>
        <button className="admin-button back-button"  onClick={Back}>Back</button>
        <button className="admin-button add-button" onClick={AddProduct}>Add Product</button>
      </div>
      <div className="admin-body">
        <h2 className="admin-bodyHead">Product List</h2>
        <div className='cardd-container'>
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} className="prooduct-image" alt={product.name} />
              </div>
              <div className="product-details">
  <h4 className="product-title">{product.category}</h4>
  <h5 className="product-breed">{product.breed}</h5>
  <p className="product-description">{product.description}</p>
  <p className="product-color"><strong>Color:</strong> {product.color}</p>
  <h3 className="product-price">${product.price}</h3>
  <p className="product-availability">
    <strong>Availability:</strong> {product.availability ? "In Stock" : "Out of Stock"}
  </p>
  <div className="product-actions">
    <button className="action-button edit-button" onClick={() => EditPage(product._id)}>Edit</button>
    <button className="action-button delete-button" onClick={() => DeleteBtn(product._id)}>Delete</button>
  </div>
</div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
