import React, { useState } from 'react';
import SortingOptions from './sorting';
import { TiThMenu } from "react-icons/ti";
import { ImMenu } from "react-icons/im";
import { TfiMenuAlt } from "react-icons/tfi";
import"./offcan.css"
function App() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSortingOptions = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div>
           <button  className="mo"onClick={toggleSortingOptions} > <ImMenu  className='mm' /></button>
            <SortingOptions isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
}

export default App;
