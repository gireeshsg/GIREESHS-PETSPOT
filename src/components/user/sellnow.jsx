import React, { useContext } from 'react';
import axios from 'axios';
import { mycontext } from '../Context'; // Make sure your context is correctly imported

const SellPetForm = () => {
    const { formData, setFormData } = useContext(mycontext);

    // Handle form data change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'image' ? e.target.files[0] : value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        
        // Append form data to FormData object
        for (const key in formData) {
            data.append(key, formData[key]);
        }
    
        // Get the token from local storage (assuming user is logged in)
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to submit a pet listing.');
            return;
        }

        try {
            // Send the POST request to the backend
            const response = await axios.post('http://localhost:5000/user/sellnow', data, {
                headers: {
                    Authorization: `Bearer ${token}` // Send token in headers for authorization
                }
            });
            
            // Handle success response
            if (response.status === 201) {
                alert('Pet listing created successfully!');
                resetForm(); // Reset form data after successful submission
            } else {
                alert('Unexpected response from the server.');
            }
        } catch (error) {
            // Handle error response from server
            if (error.response) {
                // If error response exists (i.e., server responded with an error)
                alert(`Error: ${error.response.data.error || error.response.data.message || 'An unknown error occurred.'}`);
            } else {
                // If no error response (i.e., network error or no server response)
                alert(`Error: ${error.message || 'An unexpected error occurred.'}`);
            }
        }
    };

    // Reset form data
    const resetForm = () => {
        setFormData({
            userId: '',
            sellerName: '',
            sellerContact: '',
            sellerAddress: '',
            vaccinationStatus: '',
            reasonForSelling: '',
            category: '',
            breed: '',
            gender: '',
            size: '',
            healthIssues: '',
            image: null
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="userId">User ID</label>
                <input
                    type="text"
                    name="userId"
                    value={formData.userId || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="sellerName">Seller Name</label>
                <input
                    type="text"
                    name="sellerName"
                    value={formData.sellerName || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="sellerContact">Seller Contact</label>
                <input
                    type="text"
                    name="sellerContact"
                    value={formData.sellerContact || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="sellerAddress">Seller Address</label>
                <input
                    type="text"
                    name="sellerAddress"
                    value={formData.sellerAddress || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="vaccinationStatus">Vaccination Status</label>
                <input
                    type="text"
                    name="vaccinationStatus"
                    value={formData.vaccinationStatus || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="reasonForSelling">Reason for Selling</label>
                <input
                    type="text"
                    name="reasonForSelling"
                    value={formData.reasonForSelling || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="breed">Breed</label>
                <input
                    type="text"
                    name="breed"
                    value={formData.breed || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="gender">Gender</label>
                <input
                    type="text"
                    name="gender"
                    value={formData.gender || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="size">Size</label>
                <input
                    type="text"
                    name="size"
                    value={formData.size || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="healthIssues">Health Issues</label>
                <input
                    type="text"
                    name="healthIssues"
                    value={formData.healthIssues || ''}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="image">Upload Image</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Submit Listing</button>
        </form>
    );
};

export default SellPetForm;
