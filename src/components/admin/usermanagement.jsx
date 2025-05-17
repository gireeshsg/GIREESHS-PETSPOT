import { useNavigate } from "react-router-dom";
import './Adminpage.css'; // Importing the CSS file

export default function Usersection() {
  const nav = useNavigate();

  function Orderpage() {
    nav("/getorder");
  }
  
  function userpage() {
    nav("/sell");
  }
function userdetails(){

  nav("/userr")

}


  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <div className="button-container">
        <button className="admin-button" onClick={Orderpage}>userorder</button>
      
        <button className="admin-button" onClick={userdetails}>userdetails</button>

        {/* <button className="admin-button" onClick={UsersPage}>Users</button> */}
      </div>
    </div>
  );
}
