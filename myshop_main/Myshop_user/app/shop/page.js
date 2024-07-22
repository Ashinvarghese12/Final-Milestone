// app/page.js
import ProductList from '../components/ProductList';

export default function HomePage() {
  return (
    <main className='' >
      <p className='text-center text-5xl font-serif font-semibold pt-8 text-violet-700'>Enjoy Shopping the new trends and things with us !!</p>
      <ProductList />
    </main>
  );
}
