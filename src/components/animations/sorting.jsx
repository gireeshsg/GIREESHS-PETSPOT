import React, { useContext, useState } from 'react';
import { mycontext } from '../Context';
import './sort.css';
import { IoCloseSharp } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";

function SortingOptions({ isOpen, onClose }) {
    const { sortingOptions, setSortingOptions } = useContext(mycontext);
    const [fadeIn, setFadeIn] = useState(isOpen);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setSortingOptions({
            category: selectedCategory,
            breed: [],
            sizes: [],
            gender: [],
            priceRange: [0, 40000],
          // Default sort order
        });
    };

    const handleSizeChange = (event) => {
        const value = event.target.value;
        setSortingOptions(prev => ({
            ...prev,
            sizes: prev.sizes.includes(value) ? prev.sizes.filter(v => v !== value) : [...prev.sizes, value],
        }));
    };

    const handleGenderChange = (event) => {
        const value = event.target.value;
        setSortingOptions(prev => ({
            ...prev,
            gender: prev.gender.includes(value) ? prev.gender.filter(v => v !== value) : [...prev.gender, value],
        }));
    };

    const handlePriceChange = (event, index) => {
        const newPriceRange = [...sortingOptions.priceRange];
        newPriceRange[index] = +event.target.value;
        setSortingOptions(prev => ({ ...prev, priceRange: newPriceRange }));
    };

    const handleBreedChange = (event) => {
        const value = event.target.value;
        setSortingOptions(prev => {
            const newBreeds = prev.breed.includes(value)
                ? prev.breed.filter(v => v !== value)
                : [...prev.breed, value];

            return { ...prev, breed: newBreeds };
        });
    };

    const handlePriceSortChange = (event) => {
        const selectedSort = event.target.value;
    
        // If the user clicks the same sorting option again, reset to default
        if (sortingOptions.priceSort === selectedSort) {
            setSortingOptions(prev => ({ ...prev, priceSort: '' })); // Resetting to default
        } else {
            setSortingOptions(prev => ({ ...prev, priceSort: selectedSort}));
        }
    };
    

    const resetSortingOptions = () => {
        setSortingOptions({ category: 'all', breed: [], sizes: [], gender: [], priceRange: [0, 40000], priceSort: 'lowToHigh' });
    };

    const breedsOptions = {
        all: [],
        dog: ['Bulldog', 'Germanshepherd', 'Poodle', 'Rottweier', 'Pomeranian', 'Husky', 'Pug', 'Chihuahua', 'Goldenretriever', 'Labradorretriever', 'Beagle', 'Shih Tzu', 'Dachshund','alsersian'],
        cat: ['Persian', 'Ragdoll', 'siberian', 'BritishShorthair', 'Korat', 'Manx', 'Somali', 'Norwegian Forest Cat', 'Balinese', 'Birman', 'MaineCoon'],
        rabbit: ['Rex', 'Hollandlop', 'FrenchLop', 'checkeredgiant', 'HavanaRabbit', 'EnglishSpot', 'Dutch', 'Himalayan', 'AmericanFuzzyLop'],
        bird: ['Budgie parrot', 'Pigeon', 'Duck', 'Goose', 'Finch', 'Turkey', 'Toucan', 'Quail', 'Parakeet'],
    };

    return (
        <div className={`sorting-option ${isOpen ? 'open' : 'closed'} ${fadeIn ? 'fade-in' : ''}`}>
            <FiRefreshCcw className='refresh-button' onClick={resetSortingOptions}/>
            <button className="close-button" onClick={onClose}>
                <IoCloseSharp />
            </button>

            <h1 className="title1">Sort</h1>

            <div className="sorting-container">
                <h2 className="sorting-title">Sort Your Pets</h2>

                {/* Category Selection */}
                <div className="section category-section">
                    <h3 className="section-title">By Category</h3>
                    <div className="radio-group">
                        {['all', 'Dog', 'Cat', 'Rabbit', 'Bird'].map(category => (
                            <label className="custom-radio" key={category}>
                                <input 
                                    type="radio" 
                                    name="category" 
                                    value={category} 
                                    checked={sortingOptions.category === category} 
                                    onChange={handleCategoryChange} 
                                />
                                <span className="radio-checkmark"></span>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Breeds */}
                {sortingOptions.category !== 'all' && (
                    <div className="section breeds-section">
                        <h3 className="section-title">By Breeds</h3>
                        <div className="checkbox-group">
                            {breedsOptions[sortingOptions.category.toLowerCase()].map(breed => (
                                <label className="custom-checkbox" key={breed}>
                                    <input 
                                        type="checkbox" 
                                        value={breed} 
                                        checked={sortingOptions.breed.includes(breed)} 
                                        onChange={handleBreedChange} 
                                    />
                                    <span className="checkbox-checkmark"></span>
                                    {breed}
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* Sizes */}
                <div className="section sizes-section">
                    <h3 className="section-title">By Size</h3>
                    <div className="checkbox-group">
                        {['small', 'puppy', 'kitten', 'adult', 'senior'].map(size => (
                            <label className="custom-checkbox" key={size}>
                                <input 
                                    type="checkbox" 
                                    value={size} 
                                    checked={sortingOptions.sizes.includes(size)} 
                                    onChange={handleSizeChange} 
                                />
                                <span className="checkbox-checkmark"></span>
                                {size.charAt(0).toUpperCase() + size.slice(1)}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Gender */}
                <div className="section gender-section">
                    <h3 className="section-title">By Gender</h3>
                    <div className="checkbox-group">
                        {['Male', 'Female'].map(gender => (
                            <label className="custom-checkbox" key={gender}>
                                <input 
                                    type="checkbox" 
                                    value={gender} 
                                    checked={sortingOptions.gender.includes(gender)} 
                                    onChange={handleGenderChange} 
                                />
                                <span className="checkbox-checkmark"></span>
                                {gender.charAt(0).toUpperCase() + gender.slice(1)}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div className="section price-range-section">
                    <h3 className="section-title">By Price Range</h3>
                    <div className="range-container">
                        <input 
                            type="range" 
                            min="0" 
                            max="40000" 
                            value={sortingOptions.priceRange[0]} 
                            onChange={(e) => handlePriceChange(e, 0)} 
                            className="price-range" 
                        />
                        <span>${sortingOptions.priceRange[0]}</span>
                    </div>
                    <div className="range-container">
                        <input 
                            type="range" 
                            min="0" 
                            max="40000" 
                            value={sortingOptions.priceRange[1]} 
                            onChange={(e) => handlePriceChange(e, 1)} 
                            className="price-range" 
                        />
                        <span>${sortingOptions.priceRange[1]}</span>
                    </div>
                </div>

                {/* Price Sort Options */}
              
    </div>
</div>

           
    );
}

export default SortingOptions;
