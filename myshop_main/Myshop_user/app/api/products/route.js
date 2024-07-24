export async function GET(request) {
  try {
    const apiUrl = 'https://api.escuelajs.co/api/v1/products';

    console.log(`Fetching products from: ${apiUrl}`); 
    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const products = await res.json();
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
