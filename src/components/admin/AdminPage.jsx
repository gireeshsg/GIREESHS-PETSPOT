import { useNavigate } from "react-router-dom";
import './Adminpage.css'; // Importing the CSS file

export default function AdminPage() {
  const nav = useNavigate();

  function ProductPage() {
    nav("/adminProducts");
  }
  
  function UsersPage() {
    nav("/usersection");
  }

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <div className="button-container">
        <button className="admin-button" onClick={ProductPage}>Pets</button>
  
        <button className="admin-button" onClick={UsersPage}>Users</button>
      </div>
    </div>
  );
}
