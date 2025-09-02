
"use client";

import { FaFacebook, FaLinkedin, FaGithub, FaUser } from "react-icons/fa";
import AnimatedDiv from "./AnimatedDiv";
import { motion } from "framer-motion";

const DeveloperInfo = () => {
  const socialLinks = [
    {
      icon: <FaFacebook className="text-blue-600" />,
      href: "https://www.facebook.com/zahidhasantonmoybd",
      label: "Facebook",
    },
    {
      icon: <FaLinkedin className="text-blue-500" />,
      href: "https://www.linkedin.com/in/zahidhasantonmoy/",
      label: "LinkedIn",
    },
    { 
      icon: <FaGithub className="text-gray-300" />, 
      href: "https://github.com/zahidhasantonmoy",
      label: "GitHub"
    },
    { 
      icon: <FaUser className="text-cyan-400" />, 
      href: "https://zahidhasantonmoy.vercel.app",
      label: "Portfolio"
    },
  ];

  return (
    <AnimatedDiv className="py-20 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 100 + 20,
              height: Math.random() * 100 + 20,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 0.1)`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedDiv
          className="text-4xl md:text-5xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
            Zahid Hasan Tonmoy
          </span>
        </AnimatedDiv>
        
        <AnimatedDiv
          className="text-xl text-center mb-4 max-w-3xl mx-auto bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent font-medium"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Full Stack Developer & UI/UX Enthusiast
        </AnimatedDiv>
        
        <AnimatedDiv
          className="text-gray-400 text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Crafting futuristic digital experiences with modern technologies and innovative design principles
        </AnimatedDiv>
        
        <div className="flex justify-center flex-wrap gap-8 mb-16">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -10 }}
            >
              <motion.div 
                className="text-5xl p-4 rounded-2xl bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 shadow-lg mb-3 flex items-center justify-center"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 25px rgba(56, 189, 248, 0.5)",
                  backgroundColor: "rgba(56, 189, 248, 0.1)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {link.icon}
              </motion.div>
              <span className="text-gray-300 group-hover:text-cyan-400 transition-colors duration-300">
                {link.label}
              </span>
            </motion.a>
          ))}
        </div>
        
        <AnimatedDiv
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div 
            className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium shadow-lg"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(56, 189, 248, 0.7)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="mailto:zahidhasantonmoy@gmail.com" 
              className="flex items-center"
            >
              <FaUser className="mr-2" />
              Contact Me
            </a>
          </motion.div>
        </AnimatedDiv>
      </div>
    </AnimatedDiv>
  );
};

export default DeveloperInfo;
