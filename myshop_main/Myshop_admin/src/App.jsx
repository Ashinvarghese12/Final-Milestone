// import Header from './components/Header.jsx'
// import ProductList from './components/ProductList.jsx'
// import './index.css'

// function App() {

//   return (
//     <>
//     <div >
//     <Header />
//     <ProductList />
//     </div>
//     </>
//   )
// }

// export default App


import React, { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import './index.css';

function App() {
    const [refreshProductList, setRefreshProductList] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleRefresh = () => {
        setRefreshProductList(prev => !prev); // Toggle to trigger refresh
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <div>
            <Header onRefresh={handleRefresh} onSearch={handleSearch} />
            <ProductList refresh={refreshProductList} searchQuery={searchQuery} />
        </div>
    );
}

export default App;
