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
  },
  {
    id: 2,
    name: "Dhaka Dynamites Jersey",
    price: 39.99,
    category: "domestic",
    image: "https://images.unsplash.com/photo-1545251142-f32339076e6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Support the Dhaka Dynamites with this premium jersey. Designed for comfort and style, perfect for watching matches or casual wear.",
  },
  {
    id: 3,
    name: "Chittagong Vikings Jersey",
    price: 39.99,
    category: "domestic",
    image: "https://images.unsplash.com/photo-1545251142-f32339076e6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Show your support for the Chittagong Vikings with this authentic team jersey. Perfect for matches or casual wear.",
  },
  {
    id: 4,
    name: "Rajshahi Royals Jersey",
    price: 39.99,
    category: "domestic",
    image: "https://images.unsplash.com/photo-1528137871618-79d2761e3eab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Support the Rajshahi Royals with this premium jersey. Comfortable and stylish design for true fans.",
  },
  {
    id: 5,
    name: "Khulna Titans Jersey",
    price: 39.99,
    category: "domestic",
    image: "https://images.unsplash.com/photo-1545251142-f32339076e6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Show your support for the Khulna Titans with this authentic team jersey. Perfect for matches or casual wear.",
  },
  {
    id: 6,
    name: "Comilla Victorians Jersey",
    price: 39.99,
    category: "domestic",
    image: "https://images.unsplash.com/photo-1528137871618-79d2761e3eab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    description: "Support the Comilla Victorians with this premium jersey. Designed for comfort and style, perfect for watching matches or casual wear.",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return NextResponse.json(filteredProducts);
}