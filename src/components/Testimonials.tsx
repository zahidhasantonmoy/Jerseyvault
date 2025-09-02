"use client";

import { FiStar } from "react-icons/fi";
import AnimatedDiv from "@/components/AnimatedDiv";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Mohammed Al-Rashid",
      role: "Cricket Enthusiast",
      content: "The quality of jerseys from JerseyVault is exceptional. I've bought several jerseys and they've all exceeded my expectations. The material is comfortable and the colors stay vibrant even after multiple washes.",
      rating: 5,
    },
    {
      id: 2,
      name: "Tasnim Ara",
      role: "National Team Supporter",
      content: "As a big fan of the Bangladesh national team, I'm always looking for authentic jerseys. JerseyVault has the best collection in the country. Their customer service is also top-notch!",
      rating: 5,
    },
    {
      id: 3,
      name: "Karim Hassan",
      role: "Domestic League Fan",
      content: "I've ordered jerseys for both Dhaka Dynamites and Chittagong Vikings from JerseyVault. The delivery was fast and the jerseys were exactly as described. Will definitely order again!",
      rating: 4,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <AnimatedDiv 
          className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          What Our Customers Say
        </AnimatedDiv>
        <AnimatedDiv 
          className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Hear from our satisfied customers who love their authentic Bangladeshi jerseys
        </AnimatedDiv>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedDiv 
              key={testimonial.id} 
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar 
                    key={i} 
                    className={`text-2xl ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">{testimonial.content}</p>
              <div>
                <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                <p className="text-cyan-600 text-sm">{testimonial.role}</p>
              </div>
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </section>
  );
}