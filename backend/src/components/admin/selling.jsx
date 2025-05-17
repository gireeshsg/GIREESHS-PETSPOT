import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { mycontext } from '../Context';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget to import the CSS

const SellingDetails = () => {
    // Assuming you're using react-toastify for notifications
    
        const [pets, setPets] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState('');
        const fetchPets = async () => {
            try {
                // No need to manually get token from localStorage if it's in cookies
                // Cookies are automatically sent with the request if 'HttpOnly' is used for security
                console.log("Fetching user pets");
        
                // Make the request with the token in the cookies
                const response = await axios.get('http://localhost:5000/user/pets', {
                    withCredentials: true, // Ensure cookies are sent with the request
                });
        
                // Check if the response contains data
                if (response.status === 200 && Array.isArray(response.data)) {
                    console.log("Pets fetched:", response.data);
                    setPets(response.data);  // Update state with fetched pets
                } else {
                    console.log("No pets found for this user.");
                    setPets([]);  // Set empty array if no pets are found
                }
            } catch (error) {
                console.error("Error fetching pets:", error);
                if (error.response) {
                    // Server responded with an error
                    toast.error(`Error fetching pets: ${error.response.data.error || error.response.data.message}`);
                    setError(`Error: ${error.response.data.error || error.response.data.message}`);
                } else {
                    // Network or other error
                    toast.error(`Error fetching pets: ${error.message}`);
                    setError(`Error fetching pets: ${error.message}`);
                }
            } finally {
                setLoading(false);  // Ensure loading is set to false after the request
            }
        };
        
        // Call the function to fetch pets when component mounts
        useEffect(() => {
            setLoading(true);  // Set loading to true before the request
            fetchPets();
        }, []);  // Empty dependency array to only run once when the component mounts
        
        // Render logic (this can be customized for your UI)
        if (loading) {
            return <div>Loading pets...</div>;
        }
    
        if (error) {
            return <div>Error: {error}</div>;
        }
    
        return (
            <div>
                <h3>Your Pets</h3>
                {pets.length === 0 ? (
                    <p>No pets available.</p>
                ) : (
                    <ul>
                        {pets.map((pet) => (
                            <li key={pet._id}>
                                <h4>{pet.sellerName}</h4>
                                <p>{pet.breed} - {pet.category}</p>
                                <p>{pet.size}</p>
                                <p>{pet.healthIssues}</p>
                                {/* Add more pet details as necessary */}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };
    
 
    
export default SellingDetails;
