'use client';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Sidebar from './SideBar';
import InfiniteScroll from 'react-infinite-scroll-component';

const ProductList = ({ searchQuery }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [name, setName] = useState('');
  const [offset, setOffset] = useState(0); // initial offset=0
  const [hasMore, setHasMore] = useState(true);
  const limit = 10; // initial item=10

  useEffect(() => {
    fetchItems(true);
  }, [searchQuery, category, priceRange, name]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchItems = async (isNewQuery = false) => {
    try {
      setLoading(true);
      const newOffset = isNewQuery ? 0 : offset;
      let apiUrl = '';

      if (category || name || priceRange[0] !== 0 || priceRange[1] !== 10000) {
        apiUrl = `https://api.escuelajs.co/api/v1/products?title=${name}&price_min=${priceRange[0]}&price_max=${priceRange[1]}&category=${category}`;
      } else {
        apiUrl = `https://api.escuelajs.co/api/v1/products?offset=${newOffset}&limit=${limit}`;
      }

      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await res.json();

      const filteredProducts = products.filter(product => {
        const matchesCategory = category ? product.category.name === category : true;
        const matchesName = name ? product.title.toLowerCase().includes(name.toLowerCase()) : true;
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchesCategory && matchesName && matchesPrice;
      });

      setItems(isNewQuery ? filteredProducts : [...items, ...filteredProducts]);
      setHasMore(filteredProducts.length === limit);
      setOffset(newOffset + limit);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = () => {
    fetchItems();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex gap-32 pt-16 ">
      <Sidebar setCategory={setCategory} setPriceRange={setPriceRange} setName={setName} />
      <div>
        {loading && (
          <div className="text-center my-4 text-gray-500">Loading...</div>
        )}
        {items.length === 0 && !loading && (
          <div className="text-center ps-96 my-4 text-gray-500">Could not find the product!!</div>
        )}
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            items.length > 0 && !hasMore && (
              <p className="text-center my-4 text-gray-500">All items loaded</p>
            )
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 pt-10 p-4">
            {items.map(item => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </InfiniteScroll>
        {showBackToTop && (
          <button
            className="fixed bottom-10 right-10 bg-blue-500 text-white py-2 px-4 rounded shadow-lg"
            onClick={scrollToTop}
          >
            Back to Top
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductList;















































// 'use client';
// import { useState, useEffect, useCallback } from 'react';
// import ProductCard from './ProductCard';
// import Sidebar from './SideBar';

// const ProductList = ({ searchQuery }) => {
//   const [items, setItems] = useState([]);
//   const [error, setError] = useState(null);
//   const [showBackToTop, setShowBackToTop] = useState(false);
//   const [category, setCategory] = useState('');
//   const [priceRange, setPriceRange] = useState([0, 10000]);
//   const [name, setName] = useState('');

//   useEffect(() => {
//     fetchItems();
//   }, [searchQuery, category, priceRange, name]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 300) {
//         setShowBackToTop(true);
//       } else {
//         setShowBackToTop(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const fetchItems = async () => {
//     try {
//       const res = await fetch(`https://api.escuelajs.co/api/v1/products`);
//       if (!res.ok) {
//         throw new Error('Failed to fetch products');
//       }
//       const products = await res.json();

//       const filteredProducts = products.filter(product => {
//         const matchesCategory = category ? product.category.name === category : true;
//         const matchesName = name ? product.title.toLowerCase().includes(name.toLowerCase()) : true;
//         const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
//         return matchesCategory && matchesName && matchesPrice;
//       });

//       setItems(filteredProducts);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setError('Failed to load products');
//     }
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   return (
//     <div className="flex gap-32 pt-16">
//       <Sidebar setCategory={setCategory} setPriceRange={setPriceRange} setName={setName} />
//       <div>
//         {items.length === 0 && (
//           <div className="text-center my-4 text-gray-500">Could not find the product!!</div>
//         )}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 pt-10 p-4">
//           {items.map(item => (
//             <ProductCard key={item.id} item={item} />
//           ))}
//         </div>
//         {showBackToTop && (
//           <button
//             className="fixed bottom-10 right-10 bg-blue-500 text-white py-2 px-4 rounded shadow-lg"
//             onClick={scrollToTop}
//           >
//             Back to Top
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductList;






// 'use client';
// import { useState, useEffect, useCallback } from 'react';
// import ProductCard from './ProductCard';
// import Sidebar from './SideBar';
// import InfiniteScroll from 'react-infinite-scroll-component';

// const ProductList = ({ searchQuery }) => {
//   const [items, setItems] = useState([]);
//   const [error, setError] = useState(null);
//   const [showBackToTop, setShowBackToTop] = useState(false);
//   const [category, setCategory] = useState('');
//   const [priceRange, setPriceRange] = useState([0, 10000]);
//   const [name, setName] = useState('');
//   const [offset, setOffset] = useState(0);    // initial offset=0
//   const [hasMore, setHasMore] = useState(true);
//   const limit = 10;     // initial items = 10

//   useEffect(() => {
//     fetchItems(true);
//   }, [searchQuery, category, priceRange, name]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 30000000) {
//         setShowBackToTop(true);
//       } else {
//         setShowBackToTop(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const fetchItems = async (isNewQuery = false) => {
//     try {
//       const newOffset = isNewQuery ? 0 : offset;
//       const res = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${newOffset}&limit=${limit}`);
//       if (!res.ok) {
//         throw new Error('Failed to fetch products');
//       }
//       const products = await res.json();

//       const filteredProducts = products.filter(product => {
//         const matchesCategory = category ? product.category.name === category : true;
//         const matchesName = name ? product.title.toLowerCase().includes(name.toLowerCase()) : true;
//         const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
//         return matchesCategory && matchesName && matchesPrice;
//       });

//       setItems(isNewQuery ? filteredProducts : [...items, ...filteredProducts]);
//       setHasMore(filteredProducts.length === limit);
//       setOffset(newOffset + limit);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setError('Failed to load products');
//     }
//   };

//   const fetchMoreData = () => {
//     fetchItems();
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   return (
//     <div className="flex gap-32 pt-16">
//       <Sidebar setCategory={setCategory} setPriceRange={setPriceRange} setName={setName} />
//       <div>
//         {items.length === 0 && (
//           <div className="text-center my-4 text-gray-500">Could not find the product!!</div>
//         )}
//         <InfiniteScroll
//           dataLength={items.length}
//           next={fetchMoreData}
//           hasMore={hasMore}
//           loader={<h4>Loading...</h4>}
//           endMessage={<p className="text-center my-4 text-gray-500">All items loaded</p>}
//         >
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 pt-10 p-4">
//             {items.map(item => (
//               <ProductCard key={item.id} item={item} />
//             ))}
//           </div>
//         </InfiniteScroll>
//         {showBackToTop && (
//           <button
//             className="fixed bottom-10 right-10 bg-blue-500 text-white py-2 px-4 rounded shadow-lg"
//             onClick={scrollToTop}
//           >
//             Back to Top
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductList;







// 'use client';
// import { useState, useEffect } from 'react';
// import ProductCard from './ProductCard';
// import Sidebar from './SideBar';
// import InfiniteScroll from 'react-infinite-scroll-component';

// const ProductList = ({ searchQuery }) => {
//   const [items, setItems] = useState([]);
//   const [error, setError] = useState(null);
//   const [showBackToTop, setShowBackToTop] = useState(false);
//   const [category, setCategory] = useState('');
//   const [priceRange, setPriceRange] = useState([0, 10000]);
//   const [name, setName] = useState('');
//   const [offset, setOffset] = useState(0); // initial offset=0
//   const [hasMore, setHasMore] = useState(true);
//   const limit = 10; // initial items = 10

//   useEffect(() => {
//     fetchItems(true);
//   }, [searchQuery, category, priceRange, name]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 300) {
//         setShowBackToTop(true);
//       } else {
//         setShowBackToTop(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const fetchItems = async (isNewQuery = false) => {
//     try {
//       const newOffset = isNewQuery ? 0 : offset;
//       let apiUrl = '';

//       if (category || name || priceRange[0] !== 0 || priceRange[1] !== 10000) {
//         // Filters are applied, use filter API
//         apiUrl = `https://api.escuelajs.co/api/v1/products?title=${name}&price_min=${priceRange[0]}&price_max=${priceRange[1]}&category=${category}`;
//       } else {
//         // No filters, use infinite scroll API
//         apiUrl = `https://api.escuelajs.co/api/v1/products?offset=${newOffset}&limit=${limit}`;
//       }

//       const res = await fetch(apiUrl);
//       if (!res.ok) {
//         throw new Error('Failed to fetch products');
//       }
//       const products = await res.json();

//       const filteredProducts = products.filter(product => {
//         const matchesCategory = category ? product.category.name === category : true;
//         const matchesName = name ? product.title.toLowerCase().includes(name.toLowerCase()) : true;
//         const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
//         return matchesCategory && matchesName && matchesPrice;
//       });

//       setItems(isNewQuery ? filteredProducts : [...items, ...filteredProducts]);
//       setHasMore(filteredProducts.length === limit);
//       setOffset(newOffset + limit);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setError('Failed to load products');
//     }
//   };

//   const fetchMoreData = () => {
//     fetchItems();
//   };

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   return (
//     <div className="flex gap-32 pt-16">
//       <Sidebar setCategory={setCategory} setPriceRange={setPriceRange} setName={setName} />
//       <div>
//         {items.length === 0 && (
//           <div className="text-center my-4 text-gray-500">Could not find the product!!</div>
//         )}
//         <InfiniteScroll
//           dataLength={items.length}
//           next={fetchMoreData}
//           hasMore={hasMore}
//           loader={<h4>Loading...</h4>}
//           endMessage={<p className="text-center my-4 text-gray-500">All items loaded</p>}
//         >
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 pt-10 p-4">
//             {items.map(item => (
//               <ProductCard key={item.id} item={item} />
//             ))}
//           </div>
//         </InfiniteScroll>
//         {showBackToTop && (
//           <button
//             className="fixed bottom-10 right-10 bg-blue-500 text-white py-2 px-4 rounded shadow-lg"
//             onClick={scrollToTop}
//           >
//             Back to Top
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductList;