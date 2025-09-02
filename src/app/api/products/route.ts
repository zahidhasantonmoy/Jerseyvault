import { NextResponse } from 'next/server';

// Mock product data
const products = [
  {
    id: 1,
    name: "Bangladesh National Team Jersey",
    price: 45.99,
    category: "national",
    image: "https://images.unsplash.com/photo-1528137871618-79d2761e3eab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Show your support for the Tigers with this authentic Bangladesh National Cricket Team jersey. Made with high-quality moisture-wicking fabric for maximum comfort during matches or casual wear.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "100% Polyester fabric",
      "Moisture-wicking technology",
      "Official Bangladesh Cricket Board licensed",
      "Breathable mesh panels",
      "UV protection",
    ],
  },
  {
    id: 2,
    name: "Dhaka Dynamites Jersey",
    price: 39.99,
    category: "domestic",
    image: "https://images.unsplash.com/photo-1545251142-f32339076e6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Support the Dhaka Dynamites with this premium jersey. Designed for comfort and style, perfect for watching matches or casual wear.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "High-quality polyester material",
      "Breathable fabric",
      "Team logo embroidery",
      "Comfortable fit",
    ],
  },
  {
    id: 3,
    name: "Chittagong Vikings Jersey",
    price: 39.99,
    category: "domestic",
    image: "https://images.unsplash.com/photo-1545251142-f32339076e6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Show your support for the Chittagong Vikings with this authentic team jersey. Perfect for matches or casual wear.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "Premium quality fabric",
      "Moisture-wicking material",
      "Vibrant colors",
      "Official team logo",
    ],
  },
  {
    id: 4,
    name: "Rajshahi Royals Jersey",
    price: 39.99,
    category: "domestic",
    image: "https://images.unsplash.com/photo-1528137871618-79d2761e3eab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Support the Rajshahi Royals with this premium jersey. Comfortable and stylish design for true fans.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "Lightweight fabric",
      "Breathable material",
      "Team logo",
      "Comfortable fit",
    ],
  },
  {
    id: 5,
    name: "Khulna Titans Jersey",
    price: 39.99,
    category: "domestic",
    image: "https://images.unsplash.com/photo-1545251142-f32339076e6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Show your support for the Khulna Titans with this authentic team jersey. Perfect for matches or casual wear.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "High-quality polyester",
      "Moisture-wicking technology",
      "Vibrant team colors",
      "Official licensed product",
    ],
  },
  {
    id: 6,
    name: "Comilla Victorians Jersey",
    price: 39.99,
    category: "domestic",
    image: "https://images.unsplash.com/photo-1528137871618-79d2761e3eab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Support the Comilla Victorians with this premium jersey. Designed for comfort and style, perfect for watching matches or casual wear.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "Premium fabric material",
      "Breathable design",
      "Team logo embroidery",
      "Comfortable fit",
    ],
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const id = searchParams.get('id');

  // If ID is provided, return specific product
  if (id) {
    const product = products.find(p => p.id === parseInt(id));
    if (product) {
      return NextResponse.json(product);
    }
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // If category is provided, filter by category
  if (category && category !== 'all') {
    const filteredProducts = products.filter(p => p.category === category);
    return NextResponse.json(filteredProducts);
  }

  // Return all products
  return NextResponse.json(products);
}