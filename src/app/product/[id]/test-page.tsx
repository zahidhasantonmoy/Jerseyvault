"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiStar, FiShoppingCart, FiHeart, FiShare2, FiCheck, FiChevronLeft, FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import AnimatedDiv from "@/components/AnimatedDiv";

export default function ProductDetail() {
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchProduct = async (productId: string) => {
      try {
        // Simulating API call with mock data
        const mockProduct = {
          id: 1,
          name: "Bangladesh National Team Jersey",
          price: 45.99,
          rating: 4.5,
          reviewCount: 128,
          description: "Show your support for the Bangladesh national cricket team with this authentic jersey. Made with high-quality moisture-wicking fabric for maximum comfort during matches or casual wear.",
          images: [
            "https://images.unsplash.com/photo-1528137871618-79d2761e3eab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1545251142-f32339076e6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1528137871618-79d2761e3eab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
          ],
          sizes: ["S", "M", "L", "XL", "XXL"],
          features: [
            "Moisture-wicking fabric",
            "Breathable mesh panels",
            "UV protection",
            "Officially licensed",
            "Machine washable"
          ]
        };
        
        setProduct(mockProduct);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setLoading(false);
      }
    };

    if (pathname) {
      const productId = pathname.split("/")[3]; // Adjusted for new path structure
      if (productId) {
        fetchProduct(productId);
      }
    }
  }, [pathname]);

  const renderRating = () => {
    if (!product) return null;
    
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FiStar key={i} className="text-yellow-400 fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<FiStar key="half" className="text-yellow-400 fill-current" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FiStar key={`empty-${i}`} className="text-yellow-400" />);
    }

    return stars;
  };

  const handleAddToCart = () => {
    if (!product) return;
    // In a real application, this would add the product to the cart
    alert(`Added ${quantity} ${product.name}(s) to cart!`);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <LoadingSkeleton />
          </div>
        </section>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold">Product not found</h1>
            <Link href="/products" className="text-cyan-600 hover:underline mt-4 inline-flex items-center">
              <FiChevronLeft className="mr-1" />
              Back to products
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      
      {/* Breadcrumb */}
      <section className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link href="/" className="text-cyan-600 hover:underline">Home</Link> / 
            <Link href="/products" className="text-cyan-600 hover:underline"> Products</Link> / 
            <span className="text-gray-600"> {product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <AnimatedDiv
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <div className="relative rounded-xl h-96 overflow-hidden shadow-lg">
                  <Image
                    src={product.images[activeImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image: string, index: number) => (
                                    <motion.button
                    key={index}
                    className={`relative rounded-lg h-24 overflow-hidden border-2 ${
                      activeImage === index ? "border-cyan-500" : "border-gray-200"
                    }`}
                    onClick={() => setActiveImage(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </AnimatedDiv>

            {/* Product Info */}
            <AnimatedDiv
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {renderRating()}
                </div>
                <span className="text-gray-600">({product.reviewCount} reviews)</span>
              </div>
              
              <p className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 mb-6">
                ${product.price.toFixed(2)}
              </p>
              
              <p className="text-gray-700 mb-8">{product.description}</p>
              
              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-3 text-gray-800">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size: string) => (
                    <motion.button
                      key={size}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold ${
                        selectedSize === size
                          ? "border-cyan-500 bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                          : "border-gray-300 hover:border-cyan-300 text-gray-700"
                      }`}
                      onClick={() => setSelectedSize(size)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Quantity and Add to Cart */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                  <motion.button
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </motion.button>
                  <span className="px-4 py-2">{quantity}</span>
                  <motion.button
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={() => setQuantity(quantity + 1)}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </div>
                
                <motion.button
                  className="flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiShoppingCart className="mr-2" />
                  Add to Cart
                </motion.button>
                
                <motion.button 
                  className="flex items-center border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100 text-gray-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiHeart className="text-red-500 mr-2" />
                  Wishlist
                </motion.button>
              </div>
              
              {/* Features */}
              <div className="border-t border-b border-gray-200 py-6 mb-8">
                <h3 className="text-lg font-bold mb-3 text-gray-800">Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.features.map((feature: string, index: number) => (
                    <motion.li
                      key={index} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <FiCheck className="text-cyan-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              {/* Share */}
              <div>
                <h3 className="text-lg font-bold mb-3 text-gray-800">Share</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: <FiFacebook />, name: "Facebook" },
                    { icon: <FiTwitter />, name: "Twitter" },
                    { icon: <FiInstagram />, name: "Instagram" },
                    { icon: <FiShare2 />, name: "Share" }
                  ].map((platform, index) => (
                    <motion.button
                      key={platform.name}
                      className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors"
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {platform.icon}
                    </motion.button>
                  ))}
                </div>
              </div>
            </AnimatedDiv>
          </div>
        </div>
      </section>

      {/* Product Description & Reviews */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedDiv
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
                Product Description
              </h2>
              <p className="text-gray-700 mb-4">
                {product.description}
              </p>
              <p className="text-gray-700 mb-4">
                The jersey moisture-wicking technology keeps you dry during intense matches, while the breathable mesh panels provide optimal ventilation. The UV protection feature makes it perfect for outdoor matches.
              </p>
              <p className="text-gray-700">
                Officially licensed by the Bangladesh Cricket Board, this jersey is a must-have for any cricket fan looking to support their national team with authenticity and style.
              </p>
            </AnimatedDiv>
            
            <AnimatedDiv
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
                Customer Reviews
              </h2>
              <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-gray-800">Alex Rahman</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Absolutely love this jersey! The quality is fantastic and it fits perfectly. I have received so many compliments when wearing it to matches.
                </p>
                <span className="text-sm text-gray-500">June 15, 2023</span>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {[...Array(4)].map((_, i) => (
                      <FiStar key={i} className="text-yellow-400 fill-current" />
                    ))}
                    <FiStar className="text-yellow-400" />
                  </div>
                  <span className="font-bold text-gray-800">Priya Ahmed</span>
                </div>
                <p className="text-gray-700 mb-4">
                  Great jersey overall. The material is comfortable and the colors are vibrant. The only reason I am giving 4 stars is because the sizing runs a bit small.
                </p>
                <span className="text-sm text-gray-500">May 22, 2023</span>
              </div>
            </AnimatedDiv>
          </div>
        </div>
      </section>
    </main>
  );
}