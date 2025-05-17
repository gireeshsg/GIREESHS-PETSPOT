import { useContext } from "react";
import { mycontext } from "../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminAddProduct() {
  const nav = useNavigate();
  const { product, setProduct, token } = useContext(mycontext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
      availability: name === "stock" ? value > 0 : prevProduct.availability,
      soldOut: name === "stock" ? value === "0" : prevProduct.soldOut,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      console.error("Token not available. Please log in as an admin.");
      return;
    }
    
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/products",
        product,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Product added successfully");
      nav('/adminProducts');
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
        <label className="labell">Category:</label>
        <input
          className="inputt"
          type="text"
          name="category"
          value={product.category || ""}
          onChange={handleChange}
          required
        />

        <label className="labell">Breed:</label>
        <input
          className="inputt"
          type="text"
          name="breed"
          value={product.breed || ""}
          onChange={handleChange}
          required
        />

        <label className="labell">Color:</label>
        <input
          className="inputt"
          type="text"
          name="color"
          value={product.color || ""}
          onChange={handleChange}
          required
        />

        <label className="labell">Gender:</label>
        <input
          className="inputt"
          type="text"
          name="gender"
          value={product.gender || ""}
          onChange={handleChange}
          required
        />

        <label className="labell">Description:</label>
        <textarea
          className="textareaa"
          name="description"
          value={product.description || ""}
          onChange={handleChange}
          required
        />

        <label className="labell">Price:</label>
        <input
          className="inputt"
          type="number"
          name="price"
          value={product.price || ""}
          onChange={handleChange}
          required
        />

        <label className="labell">Stock:</label>
        <input
          className="inputt"
          type="number"
          name="stock"
          value={product.stock || ""}
          onChange={handleChange}
          required
        />

        <label className="labell">Image URL:</label>
        <input
          className="inputt"
          type="text"
          name="image"
          value={product.image || ""}
          onChange={handleChange}
        />

        <label className="labell">Detail Image URL:</label>
        <input
          className="inputt"
          type="text"
          name="detailImage"
          value={product.detailImage || ""}
          onChange={handleChange}
        />

        <label className="labell">About:</label>
        <textarea
          className="inputt"
          name="about"
          value={product.about || ""}
          onChange={handleChange}
        />

        <label className="labell">Size:</label>
        <input
          className="inputt"
          type="text"
          name="size"
          value={product.size || ""}
          onChange={handleChange}
        />

        <label className="labell">Pet Count:</label>
        <input
          className="inputt"
          type="number"
          name="petcount"
          value={product.petcount || ""}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
