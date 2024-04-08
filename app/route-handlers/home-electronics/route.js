import 'server-only'

// Route Handlers for route: /route-handlers/home-electronics
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const apiBaseURL = searchParams.get('api_base_url');

    const res = await fetch(`${apiBaseURL}/home-electronics`, { method: "GET", headers: { "Content-Type": "application/json" } })

    if (!res.ok) {
        console.log('Error fetching home electronics products:', res.statusText);
        return new Response(`Error fetching home electronics products: ${res.statusText}`, { status: res.status });
    }

    console.log('Home electronics products fetched successfully');
    return res;
}