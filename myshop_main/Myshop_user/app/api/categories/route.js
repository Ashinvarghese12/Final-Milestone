export async function GET() {
    try {
      const res = await fetch('https://api.escuelajs.co/api/v1/categories');
      if (!res.ok) {
        throw new Error('Failed to fetch categories');
      }
      const categories = await res.json();
      return new Response(JSON.stringify(categories), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
  }
  