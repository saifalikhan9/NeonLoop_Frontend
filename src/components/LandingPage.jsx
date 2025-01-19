import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Lightbulb, ShoppingCart, Phone } from 'lucide-react';

const LandingPage = () => {
  const [email, setEmail] = useState("");

  const featuredProducts = [
    { name: "Neon Heart", image: "/Images/1.jpg" },
    { name: "Blue Wave", image: "/Images/2.webp" },
    { name: "Ocean Breeze", image: "/Images/3.jpg" },
  ];

  return (
    <main className="overflow-x-hidden">
      <section className="py-12 sm:py-20 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 neon-text font-Neoneon">
          Illuminate Your Space
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto subtle-neon-text font-ShadowIL">
          Custom neon lights that bring your ideas to life.
        </p>
        <Link to="/customize">
          <Button className="px-6 py-2 text-sm sm:text-xl bg-[#0077be] hover:bg-[#005f9e] text-white rounded-md transition-colors duration-300 neon-button">
            Customize your own style
          </Button>
        </Link>
      </section>

      <section id="products" className="py-12 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center neon-text">
            Featured Lights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={index}
                className="bg-gray-900 p-4 sm:p-6 rounded-lg fade-in neon-border"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-full h-40 sm:h-48 rounded-md mb-4 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 neon-text">
                  {product.name}
                </h3>
                <Button variant="secondary" className="w-full">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-12 sm:py-20 bg-gray-900 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 neon-text text-center">Our Craft</h2>
          <p className="text-base sm:text-lg mb-8 subtle-neon-text text-center">
            Handcrafted neon signs that bring light and color into your life.
            Each piece is made with care, ensuring quality and uniqueness.
          </p>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
            {[
              { icon: Lightbulb, text: "Custom Designs" },
              { icon: ShoppingCart, text: "Fast Shipping" },
              { icon: Phone, text: "24/7 Support" },
            ].map(({ icon: Icon, text }, index) => (
              <div
                key={index}
                className="text-center fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Icon size={32} className="mx-auto mb-4 text-[#0077be]" />
                <p className="neon-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-12 sm:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center neon-text">
            Get in Touch
          </h2>
          <form className="space-y-4 sm:space-y-6">
            <Input
              type="text"
              placeholder="Your Name"
              className="bg-gray-900 border-gray-700 text-white focus:border-[#0077be] focus:ring-[#0077be]"
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-900 border-gray-700 text-white focus:border-[#0077be] focus:ring-[#0077be]"
            />
            <Textarea
              placeholder="Your Message"
              className="bg-gray-900 border-gray-700 text-white focus:border-[#0077be] focus:ring-[#0077be]"
              rows={4}
            />
            <Button variant="secondary" size="lg" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;

