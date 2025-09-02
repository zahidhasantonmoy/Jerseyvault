import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebook, FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const categories = [
    { name: "National Team", path: "/products?category=national" },
    { name: "Domestic Leagues", path: "/products?category=domestic" },
    { name: "Limited Edition", path: "/products?category=limited" },
    { name: "Accessories", path: "/products?category=accessories" },
  ];

  const developerInfo = {
    name: "Zahid Hasan Tonmoy",
    title: "Full Stack Developer",
    links: [
      { name: "Facebook", url: "https://www.facebook.com/zahidhasantonmoybd", icon: <FaFacebook /> },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/zahidhasantonmoy/", icon: <FaLinkedin /> },
      { name: "GitHub", url: "https://github.com/zahidhasantonmoy", icon: <FaGithub /> },
      { name: "Portfolio", url: "https://zahidhasantonmoy.vercel.app", icon: <FaGlobe /> }
    ]
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
              JerseyVault
            </div>
            <div className="text-gray-300 mb-6 max-w-md">
              Your premier destination for authentic Bangladeshi jerseys. Quality guaranteed.
            </div>
            <div>
              <div className="flex space-x-4">
                {developerInfo.links.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-cyan-400 transition-colors p-2 rounded-full bg-gray-700 hover:bg-gray-600"
                    aria-label={link.name}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="text-xl font-bold mb-6 relative inline-block">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">Quick Links</span>
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></span>
            </div>
            <ul className="space-y-3">
              {quickLinks.map((item, index) => (
                <motion.li
                  key={item.name}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    href={item.path}
                    className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center"
                  >
                    <span className="mr-2">→</span> {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xl font-bold mb-6 relative inline-block">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">Categories</span>
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></span>
            </div>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <motion.li
                  key={category.name}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    href={category.path}
                    className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center"
                  >
                    <span className="mr-2">→</span> {category.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xl font-bold mb-6 relative inline-block">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">Developer</span>
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"></span>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-cyan-400">{developerInfo.name}</h5>
              <p className="text-gray-300 mb-4">{developerInfo.title}</p>
              <div className="flex space-x-3">
                {developerInfo.links.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-cyan-400 transition-colors"
                    aria-label={link.name}
                    whileHover={{ y: -3, scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} JerseyVault. All rights reserved. Crafted with ❤️ by <span className="text-cyan-400">{developerInfo.name}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}