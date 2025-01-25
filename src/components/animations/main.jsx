import { useNavigate } from "react-router-dom";
import "./main.css"
import { useState } from "react";
import Transitionvideo from "./transmistion";


function Mainn() {
  const nav = useNavigate()
  // function handl() {

  //   nav("/trans")

  // }
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = () => {
    setIsNavigating(true);
    setTimeout(() => {
        setIsNavigating(false);
    }, 4000); // Match this duration with your animation time
};
  // return (
    
  //   <div className="image-container">
  //    <header className="header">
  //     <div className="du">
       
     
  //       <nav className="navbarr">
  //       <div className="navbarr-container">
                                     
  //    <h2 className="travel">Welcome to pet hub </h2>
    
         
        
          
  //        </div>
         
  //       </nav>
  //       </div>
  //       </header>
  //     <img src="https://img.freepik.com/premium-photo/rescue-worker-red-suit-holding-wet-scared-dog-his-arms-providing-safety-comfort-during-water-rescue-operation_1099133-19944.jpg?size=626&ext=jpg&ga=GA1.1.664586321.1718601121&semt=ais_hybrid" height={609} width={674.7} className="background-image" />

  //     <button className="overlay-button" onClick={handl}>
  //       {"Explore"}
  //     </button>
  //     <img src="https://img.freepik.com/premium-photo/skilled-search-rescue-dog-working-diligently-disaster-area_731930-168783.jpg?size=626&ext=jpg&ga=GA1.1.664586321.1718601121&semt=ais_hybrid" height={609} width={674.3} />
  //   </div>
  // );
// import React from 'react';

return(
 
    <div className="app">

      <main className="main-content">
       
        <div className="image-container">
          
          <img src="https://media.istockphoto.com/id/2127790472/photo/shetland-dog-ans-maine-coon-cat.jpg?s=612x612&w=0&k=20&c=0W1YdxUvZyiJzcba_HGKxZqsZ9rIN4of4AZ1iWIbsLs=" height={1000} width={600} />
        </div>
        <div className="text-container">
        {isNavigating && <Transitionvideo to="/main" />}
        
            
          <h1>Welcome to pet shop!</h1>
          <p>Discover the best pet breeds, find your perfect pet, and get expert tips on pet care. Explore our site to learn more about the wonderful world of pets....</p>
          <button className="explore-button" onClick={handleClick}>Explore</button>
        </div>
      </main>
    </div>
  );
};

export default Mainn;


{/* <img src="https://img.freepik.com/free-photo/cat-love-being-affectionate-towards-each-other_23-2150984509.jpg?ga=GA1.1.664586321.1718601121&semt=ais_hybrid" height={1000} width={600} /> */}