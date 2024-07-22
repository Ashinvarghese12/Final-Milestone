// import React, { useState } from 'react';
// import Modal from './Modal'; // Import the ProductModal component

// export default function Header() {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const openModal = () => {
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//     };

//     const handleSave = () => {
        
//         closeModal();
//     };

//     return (
//         <nav className="border shadow-md sticky top-0 z-10 bg-white">
//             <div className="flex justify-between px-7 py-3">
//                 <p className="text-3xl font-bold pt-2">List of Products</p>
//                 <div className="flex gap-10">
//                     <input type="text" placeholder="Search . . ." className="border border-gray-200 rounded-md ps-3" />
//                     <button 
//                         className="border bg-violet-500 px-3 py-2 font-bold text-sm rounded-md"
//                         onClick={openModal} // Open the modal on click
//                     >
//                         <span className="text-xl">+</span> Add Product
//                     </button>
//                 </div>
//             </div>
//             {/* ProductModal component to handle add/edit product */}
//             <Modal
//                 open={isModalOpen}
//                 handleClose={closeModal}
//                 isEditing={false} // This is for adding a new product
//                 onSave={handleSave}
//             />
//         </nav>
//     );
// }


import React, { useState } from 'react';
import Modal from './Modal';

export default function Header({ onRefresh, onSearch }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = () => {
        onRefresh();
        closeModal();
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchTerm(query);
        onSearch(query); // Pass the search query to the parent component
    };

    return (
        <nav className="border shadow-md sticky top-0 z-10 bg-white">
            <div className="flex justify-between px-7 py-3">
                <p className="text-3xl font-bold pt-2">List of Products</p>
                <div className="flex gap-10">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search . . ."
                        className="border border-gray-200 rounded-md ps-3"
                    />
                    <button 
                        className="border bg-violet-500 px-3 py-2 font-bold text-sm rounded-md"
                        onClick={openModal}
                    >
                        <span className="text-xl">+</span> Add Product
                    </button>
                </div>
            </div>
            <Modal
                open={isModalOpen}
                handleClose={closeModal}
                isEditing={false} // This is for adding a new product
                onSave={handleSave}
            />
        </nav>
    );
}
