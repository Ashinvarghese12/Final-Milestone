import { useState, useEffect } from 'react';

const Sidebar = ({ setCategory, setPriceRange, setName }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('https://api.escuelajs.co/api/v1/categories');
      const categories = await res.json();
      setCategories(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);
    setCategory(selected);
  };

  const handlePriceChange = () => {
    setPriceRange([minPrice, maxPrice]);
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setSearchName(name);
    setName(name);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSearchName('');
    setCategory('');
    setPriceRange([0, 10000]);
    setName('');
  };

  return (
    <div className="bg-gray-100 h-full sticky left-10 border px-14 py-10 rounded-lg  shadow-lg w-96">
      <h2 className="text-2xl text-black font-bold mb-4">Filter Products</h2>
      <div className="mb-4">
        <h3 className="font-bold text-black mb-2">Category</h3>
        <select
          className="w-64 bg-white text-black border rounded-xl py-3 p-2"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <h3 className="font-bold text-black mb-2">Search by Name</h3>
        <input
          type="text"
          className="w-64 bg-white text-black border rounded-xl py-3 p-2"
          value={searchName}
          onChange={handleNameChange}
          placeholder="Search by name"
        />
      </div>
      <div className="mb-4">
        <h3 className="font-bold text-black mb-2">Price Range</h3>
        <div className="flex gap-1">
          <input
            type="number"
            className="w-32 bg-white text-black border rounded-xl py-2 p-2"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            onBlur={handlePriceChange}
            placeholder="Min Price"
          />
          <input
            type="number"
            className="w-32 bg-white text-black border rounded-xl py-2 p-2"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            onBlur={handlePriceChange}
            placeholder="Max Price"
          />
        </div>
      </div>
      <div className='flex justify-center'>
        <button
          onClick={clearFilters}
          className="w-32 bg-red-500 text-white py-2  rounded-xl mt-4"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
